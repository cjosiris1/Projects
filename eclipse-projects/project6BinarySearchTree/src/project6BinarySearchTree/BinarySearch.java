package project6BinarySearchTree;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class BinarySearch {

	public static void main(String[] args) throws FileNotFoundException 
	{
		// Scan text file
		Scanner file = new Scanner(new File("test.txt")).useDelimiter(",");
		
		while (file.hasNext())
		System.out.println(file.nextLine());
		
		BinarySearch tree = new BinarySearch();

		// User is asked to input a word
		System.out.println("Enter string, enter -1 to quit:");
		Scanner scan = new Scanner(System.in);
		String userInput = scan.next();
		
		
	}

	
}
