package project1;

import java.util.Scanner;

public class Stringy 
{
	// variables
	public int curr_length;
	public char[] array;
	String words;
	
	Stringy(String userInput)
	{
		curr_length = userInput.length(); // set current length as the length of input string
		// Creates an array of string length
		char[] ch = new char[userInput.length()];
		
		// Copies character by character into the array
		for (int i = 0; i < userInput.length(); i++)
		{
			ch[i] = userInput.charAt(i);
		}
		
		this.array = ch;
		
		// Print out array
		for (char c : ch) 
		{
			System.out.println(c);
		}
	}
	
	// Copy Constructor
	Stringy(Stringy stringyTest)
	{
		words = stringyTest.words;					// copy variable
		curr_length = stringyTest.curr_length;		// copy variable
		array = stringyTest.array;					// copy variable
	}
	
	void concat(Stringy stringyTest)
	{
		Stringy stringyTest1 = new Stringy(stringyTest);    // sets up a copy
		System.out.println(stringyTest1.array);				// prints out copy
	}
	
	// ensures capacity of the array doesnt go out of bounds
	public void ensureCapacity(Stringy input)
	{
		// makes a bigger array w the current length and array length bounds
		char bigger[] = new char[curr_length + input.array.length];
	
		for (int i = 0; i < array.length; i++)
		{
			bigger[i] = this.array[i];			// creates array
		}
	}
	
	// set length
	int length(int i)
	{
		curr_length = i; 				// set current length as int
		return curr_length; 			// returns length
	}
	
	public void toString(Stringy input)
	{
		System.out.println(input.array.toString()); // changes array to string/ can be used for any variable
	}
	
	
	public static void main(String[] args) 
	{
		// User inputs a word
		System.out.println("Enter a word:");
		Scanner scan = new Scanner(System.in);
		String userInput = scan.next();
				
		Stringy test = new Stringy(userInput); 	// initiate new Stringy
		Stringy copyTest = new Stringy(test);	// copy original stringy into copy
		test.concat(test);						// concat method to call a copy Stringy
		test.ensureCapacity(copyTest);			// ensure capacity of array
		
		System.out.println("Uppercase: " + userInput.toUpperCase());  								 // Convert word to uppercase
		System.out.println("Lowercase: " + userInput.toLowerCase());  								 // Convert word to lowercase
		System.out.println("Starting from index 3: " + userInput.substring(3)); 					 // return string starting from x index
		System.out.println("Starting from index 1 ending at index 5: " + userInput.substring(1, 5)); // returns string starting from x and ending at y
		System.out.println("(-1 if none) Starting index occurance of e: " + userInput.indexOf("e")); // returns the starting index occurance of object, if none return -1
		System.out.println("(-1 if none) Last occurance of e: " + userInput.lastIndexOf("e")); 		 // returns the last index occurance of object, if none return -1
	}

}
