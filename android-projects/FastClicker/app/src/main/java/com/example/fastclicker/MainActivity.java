package com.example.fastclicker;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    Button btnClick, btnStart;
    TextView tvClicks, tvTimeLeft;
    int numberOfClicks = 0;
    int secondsLeft = 20;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnClick = (Button) findViewById(R.id.btnClick);
        btnStart = (Button) findViewById(R.id.btnStart);

        tvClicks = (TextView) findViewById(R.id.tvClicks);
        tvTimeLeft = (TextView) findViewById(R.id.tvTimeLeft);

        btnClick.setEnabled(false);

        final CountDownTimer timer = new CountDownTimer(20000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                secondsLeft--;
                tvTimeLeft.setText("Time Left: " + secondsLeft);
            }

            @Override
            public void onFinish() {
                btnClick.setEnabled(false);
            }
        };

        btnClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                numberOfClicks++;
                tvClicks.setText("Number of Clicks: " + numberOfClicks);
            }
        });
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                secondsLeft = 20;
                numberOfClicks = 0;
                btnClick.setEnabled(true);
                timer.start();
            }
        });
    }
}