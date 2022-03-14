package com.example.mathquiz;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    Button btnStart, btnAnswer0, btnAnswer1, btnAnswer2, btnAnswer3;
    ProgressBar progTimer;
    TextView tvTimer, tvQuestion, tvScore, tvClickGo;

    Game g = new Game();

    int secondsRemaining = 30;

    CountDownTimer timer = new CountDownTimer(30000, 1000) {
        @Override
        public void onTick(long millisUntilFinished) {
            secondsRemaining--;
            tvTimer.setText(Integer.toString(secondsRemaining) + "sec");
            progTimer.setProgress(30 - secondsRemaining);
        }

        @Override
        public void onFinish() {
            btnAnswer0.setEnabled(false);
            btnAnswer1.setEnabled(false);
            btnAnswer2.setEnabled(false);
            btnAnswer3.setEnabled(false);
            tvClickGo.setText("Time is up! " + g.getNumberCorrect() + "/" + (g.getTotalQuestions()-1));

            final Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    btnStart.setVisibility(View.VISIBLE);
                }
            }, 4000);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnStart = (Button) findViewById(R.id.btnStart);
        btnAnswer0 = (Button) findViewById(R.id.btnAnswer0);
        btnAnswer1 = (Button) findViewById(R.id.btnAnswer1);
        btnAnswer2 = (Button) findViewById(R.id.btnAnswer2);
        btnAnswer3 = (Button) findViewById(R.id.btnAnswer3);

        progTimer = (ProgressBar) findViewById(R.id.progTimer);

        tvTimer = (TextView) findViewById(R.id.tvTimer);
        tvQuestion = (TextView) findViewById(R.id.tvQuestion);
        tvScore = (TextView) findViewById(R.id.tvScore);
        tvClickGo = (TextView) findViewById(R.id.tvClickGo);

        tvTimer.setText("0Sec");
        tvQuestion.setText("");
        tvScore.setText("0pts");
        tvClickGo.setText("Click Go");

        View.OnClickListener startButtonClickListener = (v) -> {
            Button startButton = (Button) v;

            startButton.setVisibility(View.INVISIBLE);
            secondsRemaining = 30;
            g = new Game();
            nextTurn();
            timer.start();
        };
        View.OnClickListener answerButtonClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Button buttonClicked = (Button) v;

                int answerSelected = Integer.parseInt(buttonClicked.getText().toString());
                //Toast.makeText(MainActivity.this, "Answer Selected = " + answerSelected, Toast.LENGTH_SHORT ).show();

                g.checkAnswer(answerSelected);
                tvScore.setText(Integer.toString(g.getScore()));
                nextTurn();
            }
        };

        btnStart.setOnClickListener(startButtonClickListener);

        btnAnswer0.setOnClickListener(answerButtonClickListener);
        btnAnswer1.setOnClickListener(answerButtonClickListener);
        btnAnswer2.setOnClickListener(answerButtonClickListener);
        btnAnswer3.setOnClickListener(answerButtonClickListener);

    }
    private void nextTurn()
    {
        // Create new questions
        // set text on answer buttons
        // enable answer buttons
        // start timer

        g.makeNewQuestion();
        int[] answer = g.getCurrentQuestion().getAnswerArray();

        btnAnswer0.setText(Integer.toString(answer[0]));
        btnAnswer1.setText(Integer.toString(answer[1]));
        btnAnswer2.setText(Integer.toString(answer[2]));
        btnAnswer3.setText(Integer.toString(answer[3]));

        btnAnswer0.setEnabled(true);
        btnAnswer1.setEnabled(true);
        btnAnswer2.setEnabled(true);
        btnAnswer3.setEnabled(true);

        tvQuestion.setText(g.getCurrentQuestion().getQuestionPhrase());

        tvClickGo.setText(g.getNumberCorrect() + "/" + (g.getTotalQuestions()-1));
    }
}