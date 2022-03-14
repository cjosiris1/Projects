package com.example.rockpaperscissors;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;

public class MainActivity extends AppCompatActivity {
    Button btnRock, btnScissors, btnPaper;
    TextView tvHumanChoice, tvComputerChoice, tvScore;
    ImageView ivHuman, ivComputer;

    int HumanScore, ComputerScore = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnRock = (Button) findViewById(R.id.btnRock);
        btnScissors = (Button) findViewById(R.id.btnScissors);
        btnPaper = (Button) findViewById(R.id.btnPaper);

        tvHumanChoice = (TextView) findViewById(R.id.tvHumanChoice);
        tvComputerChoice = (TextView) findViewById(R.id.tvComputerChoice);
        tvScore = (TextView) findViewById(R.id.tvScore);

        ivHuman = (ImageView) findViewById(R.id.ivHuman);
        ivComputer = (ImageView) findViewById(R.id.ivComputer);

        btnRock.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ivHuman.setImageResource(R.drawable.rock);
                String message = playturn("rock");

                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();

                tvScore.setText("Human Score: " + Integer.toString(HumanScore) + " Computer Score: " + Integer.toString(ComputerScore));
            }
        });
        btnScissors.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ivHuman.setImageResource(R.drawable.scissors);
                String message = playturn("scissors");

                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();

                tvScore.setText("Human Score: " + Integer.toString(HumanScore) + " Computer Score: " + Integer.toString(ComputerScore));
            }
        });
        btnPaper.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ivHuman.setImageResource(R.drawable.paper);
                String message = playturn("paper");

                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();

                tvScore.setText("Human Score: " + Integer.toString(HumanScore) + " Computer Score: " + Integer.toString(ComputerScore));
            }
        });
    }
    public String playturn(String playerchoice)
    {
        String computerchoice = "";
        Random r = new Random();

        // choose rock paper or scissors for computer
        int computerchoicenum = r.nextInt(3) + 1;

        if (computerchoicenum == 1)
        {
            computerchoice = "rock";
        }
        if (computerchoicenum == 2)
        {
            computerchoice = "scissors";
        }
        if (computerchoicenum == 3)
        {
            computerchoice = "paper";
        }

        // set computer image based on choice
        if (computerchoice == "rock")
        {
            ivComputer.setImageResource(R.drawable.rock);
        }
        if (computerchoice == "scissors")
        {
            ivComputer.setImageResource(R.drawable.scissors);
        }
        if (computerchoice == "paper")
        {
            ivComputer.setImageResource(R.drawable.paper);
        }

        // win conditions
        if (computerchoice == playerchoice)
        {
            return "Draw";
        }
        else if (playerchoice == "rock" && computerchoice == "scissors")
        {
            HumanScore++;
            return "Rock crushes scissors. You win.";
        }
        else if (playerchoice == "scissors" && computerchoice == "paper")
        {
            HumanScore++;
            return "Scissors cuts paper. You win.";
        }
        else if (playerchoice == "paper" && computerchoice == "rock")
        {
            HumanScore++;
            return "Paper covers rock. You win.";
        }
        else if (computerchoice == "rock" && playerchoice == "scissors")
        {
           ComputerScore++;
            return "Rock crushes scissors. You lose.";
        }
        else if (computerchoice == "scissors" && playerchoice == "paper")
        {
            ComputerScore++;
            return "Scissors cuts paper. You lose.";
        }
        else if (computerchoice == "paper" && playerchoice == "rock")
        {
            ComputerScore++;
            return "Paper covers rock. You lose.";
        }
        else return "Not Sure";
    }
}