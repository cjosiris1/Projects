package com.example.jokesapplicationreal;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;
import android.widget.Button;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    Button btnjoke1, btnjoke2, btnjoke3, btnjoke4, btnjoke5, btnjoke6;

    TextView tvmessage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnjoke1 = findViewById(R.id.btnjoke1);
        btnjoke2 = findViewById(R.id.btnjoke2);
        btnjoke3 = findViewById(R.id.btnjoke3);
        btnjoke4 = findViewById(R.id.btnjoke4);
        btnjoke5 = findViewById(R.id.btnjoke5);
        btnjoke6 = findViewById(R.id.btnjoke6);

        tvmessage = findViewById(R.id.tvmessage);

        // Create click listeners
        btnjoke1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "To get to the other side", Toast.LENGTH_SHORT).show();
            }
        });
        btnjoke2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText( MainActivity.this, "Bison", Toast.LENGTH_SHORT).show();
            }
        });
        btnjoke3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this,  "Red paint", Toast.LENGTH_SHORT).show();
            }
        });
        btnjoke4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tvmessage.setText("B");
            }
        });
        btnjoke5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tvmessage.setText("I'm just very relaxed");
            }
        });
        btnjoke6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tvmessage.setText("And never let a fool kiss you");
            }
        });
    }
}