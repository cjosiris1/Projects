package com.example.dicerollgame;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {
    Button btnRoll;
    TextView tvRollNumber;
    ImageView ivDice, ivDice2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnRoll = (Button) findViewById(R.id.btnRoll);
        tvRollNumber = (TextView) findViewById(R.id.tvRollNumber);
        ivDice = (ImageView) findViewById(R.id.ivDice);
        ivDice2 = (ImageView) findViewById(R.id.ivDice2);

        btnRoll.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Random r = new Random();
                int theRoll;
                int theRoll2;

                //random number 1-6
                theRoll = r.nextInt(6) + 1;
                theRoll2 = r.nextInt(6) + 1;
                int sum = theRoll + theRoll2;
                tvRollNumber.setText("You rolled a: " + sum);

                switch(theRoll)
                {
                    case 1:
                    {
                        ivDice.setImageResource(R.drawable.dice1);
                        break;
                    }
                    case 2:
                    {
                        ivDice.setImageResource(R.drawable.dice2);
                        break;
                    }
                    case 3:
                    {
                        ivDice.setImageResource(R.drawable.dice3);
                        break;
                    }
                    case 4:
                    {
                        ivDice.setImageResource(R.drawable.dice4);
                        break;
                    }
                    case 5:
                    {
                        ivDice.setImageResource(R.drawable.dice5);
                        break;
                    }
                    case 6:
                    {
                        ivDice.setImageResource(R.drawable.dice6);
                        break;
                    }
                }
                switch(theRoll2)
                {
                    case 1:
                    {
                        ivDice2.setImageResource(R.drawable.dice1);
                        break;
                    }
                    case 2:
                    {
                        ivDice2.setImageResource(R.drawable.dice2);
                        break;
                    }
                    case 3:
                    {
                        ivDice2.setImageResource(R.drawable.dice3);
                        break;
                    }
                    case 4:
                    {
                        ivDice2.setImageResource(R.drawable.dice4);
                        break;
                    }
                    case 5:
                    {
                        ivDice2.setImageResource(R.drawable.dice5);
                        break;
                    }
                    case 6:
                    {
                        ivDice2.setImageResource(R.drawable.dice6);
                        break;
                    }
                }
            }
        });

    }
}