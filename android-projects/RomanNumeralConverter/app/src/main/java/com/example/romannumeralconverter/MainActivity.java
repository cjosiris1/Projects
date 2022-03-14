package com.example.romannumeralconverter;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    Button bConvertToNumber, bConvertToRoman;
    EditText etNumber, etRomanNumeral;
    TextView tvNumberOutput, tvRomanOutput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bConvertToNumber = (Button) findViewById(R.id.bConvertToNumber);
        bConvertToRoman = (Button) findViewById(R.id.bConvertToRoman);
        etNumber = (EditText) findViewById(R.id.etNumber);
        etRomanNumeral = (EditText) findViewById(R.id.etRomanNumeral);
        tvNumberOutput = (TextView) findViewById(R.id.tvNumberOutput);
        tvRomanOutput = (TextView) findViewById(R.id.tvRomanOutput);

        bConvertToNumber.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // convert number to numeral
                RomanConverter rc = new RomanConverter();
                
                String theRoman; // input from user
                int theNumber; // string to send back to user

                // get numeral from text field
                theRoman = etRomanNumeral.getText().toString();

                // get number from RomanConverter class
                theNumber = rc.toNumber(theRoman);

                // send the string to screen in TextView
                tvNumberOutput.setText(theNumber);

            }
        });
        bConvertToRoman.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //convert number to numeral
                NumberConverter nc = new NumberConverter();

                int theNumber; // input from the user
                String theRoman; // string to send back to user

                // get number from text field
                theNumber = Integer.parseInt(etNumber.getText().toString());

                // get roman numeral from NumberConverter class
                theRoman = nc.toRoman(theNumber);

                // send the string to screen in TextView
                tvRomanOutput.setText(theRoman);

            }
        });
    }
}