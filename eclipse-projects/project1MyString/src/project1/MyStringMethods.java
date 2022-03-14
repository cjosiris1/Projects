package project1;

import java.util.Scanner;

public class MyStringMethods {
	public int curr_length;
	public char[] array;
	
	public MyStringMethods() 
	{
		this.curr_length = 0; // constructor initializing length to 0
		this.array = null; // constructor initializing array to null
	}
	
	public MyStringMethods(MyStringMethods copy) // copy constructor
	{
		for (int i = 0; i < 10; i++)
		{
			this.array[i] = copy.array[i];
		}
		
		System.out.println(copy);
	}

	public void ensureCapacity(MyStringMethods input)
	{
		char bigger[] = new char[curr_length + input.array.length];

		for (int i = 0; i < array.length; i++)
		{
			bigger[i] = this.array[i];
		}
	}
	
	public static String toString(char[] array) // toString method
	{
		String string = new String(array);
		
		return string;
	}
	
	int length(int i)
	{
		curr_length = i;
		return curr_length;
	}
	
	public MyStringMethods concat(MyStringMethods input)
	{
		ensureCapacity(input);
		MyStringMethods newString = new MyStringMethods(input);
		for (int i = 0; i < 10; i++)
		{
			this.array[i] = newString.array[i];
		}
		
		return newString;	
	}
	
	public boolean equals(MyStringMethods newString)
	{	
		String hi = newString.toString();
		if (newString.toString() == hi) 		// compare MyString to a new string
		return true;
		
		else
			return false;
	}
	
	public void compareTo(MyStringMethods input)
	{
		
	}
	
	// Lowercase Method
	public String toLower()
	{
		System.out.println("Enter a word to lower case:");
		Scanner scan = new Scanner(System.in);
		String userInput = scan.next();
		
		return userInput.toLowerCase();
		
	}
	
	// Uppercase Method
	public String toUpper()
	{
		System.out.println("Enter a word to upper case:");
		Scanner scan = new Scanner(System.in);
		String userInput = scan.next();
		
		return userInput.toUpperCase();
	}
	
	// Substring Method
	public void substring(int n)
	{
		System.out.println("Enter word to substring: ");
		Scanner scan = new Scanner(System.in); // scan word
		String userInput = scan.next();
		
		System.out.println("Enter starting index number: ");
		Scanner scanx = new Scanner(System.in); // scan number x
		int x = scanx.nextInt(); 
		
		String sub = userInput.substring(x); // use number x as starting index
		System.out.println(sub); // print
	}
	
	// Substring Method
	public void substring(int n, int m)
	{
		System.out.println("Enter word to substring: ");
		Scanner scan = new Scanner(System.in); // scan word
		String userInput = scan.next();
		
		System.out.println("Enter first number: ");
		Scanner scanx = new Scanner(System.in); // scan number x
		System.out.println("Enter second number: ");
		Scanner scany = new Scanner(System.in); // scan number y
		int x = scanx.nextInt(); 
		int y = scany.nextInt();
		
		String sub = userInput.substring(x,y); // use number x as starting index, number y as end index
		System.out.println(sub); // print
	}
	
	public void indexOf(MyStringMethods input)
	{
		System.out.println("Enter word to find the index: ");
		Scanner scan = new Scanner(System.in); // scan word
		String userInput = scan.next();
		
		System.out.println("Enter letter to find: ");
		Scanner scanLetter = new Scanner(System.in); // scan letter
		int letter = scanLetter.nextInt(); 
		
		System.out.println(letter + " was found at " + userInput.indexOf(letter)); // outputs index found at
	}
	
	public void lastIndexOf(MyStringMethods input)
	{
		System.out.println("Enter word to find the last index: ");
		Scanner scan = new Scanner(System.in); // scan word
		String userInput = scan.next();
		
		System.out.println("Enter letter to find: ");
		Scanner scanLastLetter = new Scanner(System.in); // scan letter
		int lastLetter = scanLastLetter.nextInt(); 
		
		System.out.println(lastLetter + " was found last at " + userInput.indexOf(lastLetter)); // outputs last index found at
	}
	
	// test
	public static void main(String[] args) 
	{
		// User inputs a word
		System.out.println("Enter a word:");
		Scanner scan = new Scanner(System.in);
		String userInput = scan.next();
	
		// Creates an array of string length
		char[] ch = new char[userInput.length()];
		
		// Copies character by character into the array
		for (int i = 0; i < userInput.length(); i++)
		{
			ch[i] = userInput.charAt(i);
		}
		
		// Print out array
		for (char c : ch) 
		{
			System.out.println(c);
		}
		
		System.out.println("Number of characters in the string: " + userInput.length()); // return number of characters in string
		System.out.println("MyString Object: " + toString(ch)); // returns MyString as string
		System.out.println("Word equals array? " + userInput.equals(ch)); // NOT DONE
		System.out.println("Uppercase: " + userInput.toUpperCase());  // Convert word to uppercase
		System.out.println("Lowercase: " + userInput.toLowerCase());  // Convert word to lowercase
		System.out.println("Starting from index 3: " + userInput.substring(3)); // return string starting from x index
		System.out.println("Starting from index 1 ending at index 5: " + userInput.substring(1, 5)); // returns string starting from x and ending at y
		System.out.println("(-1 if none) Starting index occurance of e: " + userInput.indexOf("e")); // returns the starting index occurance of object, if none return -1
		System.out.println("(-1 if none) Last occurance of e: " + userInput.lastIndexOf("e")); // returns the last index occurance of object, if none return -1
	}
}
