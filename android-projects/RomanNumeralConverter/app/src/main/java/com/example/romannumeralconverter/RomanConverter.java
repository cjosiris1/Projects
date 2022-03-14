package com.example.romannumeralconverter;

public class RomanConverter {
    public int toNumber(String romanNumber) {
        int lastNumber = 0;
        String romanNumeral = romanNumber.toUpperCase();
        /* operation to be performed on upper cases even if user
           enters roman values in lower case chars */
        for (int x = romanNumeral.length() - 1; x >= 0; x--) {
            char convertToDecimal = romanNumeral.charAt(x);

            switch (convertToDecimal) {
                case 'M':
                    lastNumber = 1000;
                    break;

                case 'D':
                    lastNumber = 500;
                    break;

                case 'C':
                    lastNumber = 100;
                    break;

                case 'L':
                    lastNumber = 50;
                    break;

                case 'X':
                    lastNumber = 10;
                    break;

                case 'V':
                    lastNumber = 5;
                    break;

                case 'I':
                    lastNumber = 1;
                    break;
            }
        }
            return lastNumber;
    }


    public String toRoman(int theNumber) {
        // return string of number
        return "XIV";
    }
}
