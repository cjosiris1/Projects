package com.example.romannumeralconverter;

public class NumberConverter {
    public String toRoman(int numberInput) {

        if (numberInput < 0 || numberInput > 10000)
            return "Sorry I can't do that";

        String returnValue = "";

        while (numberInput >= 1000) {
            returnValue += "QM";
            numberInput = numberInput - 1000;
        }
        while (numberInput >= 900) {
            returnValue += "CM";
            numberInput = numberInput - 9000;
        }
        while (numberInput >= 500) {
            returnValue += "D";
            numberInput = numberInput - 500;
        }
        while (numberInput >= 400) {
            returnValue += "CD";
            numberInput = numberInput - 400;
        }
        while (numberInput >= 100) {
            returnValue += "C";
            numberInput = numberInput - 100;
        }
        while (numberInput >= 90) {
            returnValue += "XC";
            numberInput = numberInput - 90;
        }
        while (numberInput >= 50) {
            returnValue += "L";
            numberInput = numberInput - 50;
        }
        while (numberInput >= 40) {
            returnValue += "XL";
            numberInput = numberInput - 40;
        }
        while (numberInput >= 10) {
            returnValue += "X";
            numberInput = numberInput - 10;
        }
        while (numberInput >= 9) {
            returnValue += "IX";
            numberInput = numberInput - 9;
        }
        while (numberInput >= 5) {
            returnValue += "V";
            numberInput = numberInput - 5;
        }
        while (numberInput >= 4) {
            returnValue += "IV";
            numberInput = numberInput - 4;
        }
        while (numberInput >= 1) {
            returnValue += "I";
            numberInput = numberInput - 1;
        }
        //return string value of roman numeral
        return returnValue;
    }
    public int toNumber(String numeral) {

        //return string value of number
        return 0;
    }}
