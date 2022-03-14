package project5RecursiveStrings;

import java.util.Scanner;

// Charles Osiris
public class RecursiveStrings 
{
	public static void main(String[] args) 
	{
		// Declared
		RecursiveStrings inputWord = new RecursiveStrings();
		
		// User is asked to input a word
		System.out.println("Type a word:");
		Scanner scan = new Scanner(System.in);
		String word = scan.next();
		
		
		// Determine if the word is a slip
		inputWord.determineSlip(word);
	
		// Determine if the word is a slap
		inputWord.determineSlap(word);
		
		// Determine if the word is a slop
		inputWord.determineSlop(word);

	}
	
	/**
	 * Checks if the word is a slip:
	 * 1st character is either a D or E
	 * 1st character is followed by a string of 1 or more Fs
	 * Fs followed by another slip or ends in G
	 * @param word
	 * @return true or false
	 */
	public boolean determineSlip(String word)
	{
		// Checks string size, and converts string to chars
		int size = word.length();
		int n = 0;
		char letter = word.charAt(n);
	
		// The string must start with a D or an E
		if (word.charAt(0) == 'D' || word.charAt(0) == 'E')
		{
			//System.out.println(word.charAt(0));
		}
		else 
		{
			System.out.println(word + " is NOT a SLIP");
			return false;
		}
		
		// D or E followed by F
		if (word.charAt(1) == 'F')
		{
			//System.out.println(word.charAt(1));
			
			for (int i = 2; i < size; i++)
			{
				if (word.charAt(i) == 'D' || word.charAt(i) == 'E' || word.charAt(i) == 'F'|| word.charAt(i) == 'G')
				{
					if (word.charAt(i) == 'D' || word.charAt(i) == 'E')
					{
						if (word.charAt(i + 1) == 'F')
						{
							
						}
						else 
						{
							System.out.println(word + " is NOT a SLIP");
							return false;
						}
					}
					//System.out.println(word.charAt(i));
				}
			}
		}
		else
		{
			System.out.println(word + " is NOT a SLIP");
			return false;
		}
		
		// The string must end in G
		if (word.charAt(size - 1) != 'G')
		{
			System.out.println(word + " is NOT a SLIP");
			return false;
		}
		
		System.out.println(word + " is a slip :)");
		return true;
	}
	
	/**
	 * Checks if the word is a slap:
	 * first character is an A
	 * if two characters = AH
	 * if not, must be AB -> slap, C or A -> slip, C
	 * @param word
	 * @return true or false
	 */
	public boolean determineSlap(String word)
	{
		// Checks string size, and declares first and second char
		int size = word.length();
		int n = 0;
		
		// The string must start with an A
		if (word.charAt(0) == 'A')
		{
			//System.out.println();
		}
		
		// Checks if the string is only 2 characters
		else if (size == 2)
		{
			if (word.charAt(0) == 'A' && word.charAt(1) == 'H')
			{
				//System.out.println();
			}
			else
			{
				System.out.println(word + " is NOT a SLAP");
				return false;
			}
		}
		
		// Checks if the letter after A is a B
		else if (word.charAt(1) == 'B')
		{
			String sub = word.substring(2, size-1);
			int subsize = sub.length();
			determineSlap(sub);
			
			// AB followed by slap must end in C
			if (sub.charAt(subsize) != 'C')
			{
				System.out.println(word + " is NOT a SLAP");
				return false;
			}
		}
		else
		{
			System.out.println(word + " is NOT a SLAP");
			return false;
		}
		
		// A followed by slip must end in C
		if (word.charAt(1) == 'A')
		{
			String sub2 = word.substring(1, size-1);
			int subsize2 = sub2.length();
			determineSlip(sub2);
			
			// A followed by slip must end in C
			if (sub2.charAt(subsize2) != 'C')
			{
				System.out.println(word + " is NOT a SLAP");
				return false;
			}
		}
		
		System.out.println(word + " is a slap :)");
		return true;
	}
	
	
	/**
	 * A Slop consists of a Slap followed by a Slip
	 * @param word
	 * @return true or false
	 */
	public boolean determineSlop(String word)
	{
		// size variable
		int size = word.length();
		
		System.out.println();
		System.out.println("DETERMINE SLOP:");
		
		// Determine what terminates the string and split into a substring
		// Determine if the terminating letter completes a slap
		// if it does pass through the rest of the string and determine if its a slip
		
		// Make sure the word is not size of 2, Impossible to be a slop
		if (size != 2)
		{
			// Check if the word begins with an A followed by H
			if (word.charAt(0) == 'A' && word.charAt(1) == 'H')
			{
				// Split the AH and rest of word into substrings
				String sub = word.substring(0, 2);
				String sub2 = word.substring(2, size);
				
				// Determine if the 2nd substring is a slip
				if (determineSlip(sub2) == true)
				{
					System.out.println(word + " is a slop :)");
					return true;
					
				}
			}
		}
		
		// Catch out of bounds errors and output NOT a SLOP
		try 
		{
			// All slaps begin with an A
			if (word.charAt(0) == 'A')
			{
				int i = size -1;
				
				while (word.charAt(i) != 'C')
				{
					i--;
				}
				
				// Checks when slap ends in C
				if (word.charAt(i) == 'C')
				{
					// Split both words into substrings
					int count = i;
					String slapsub = word.substring(0, count);
					String slipsub = word.substring(count+1, size);
					
					// Checks if 2nd substring is a slip
					if (determineSlip(slipsub) == true)
					{
						System.out.println(word + " is a slop :)");
						return true;
					}
				}
				
			} 
			else
			{
				System.out.println(word + " is NOT a SLOP");
				return false;
			}
		}
		
		// Catch out of bounds errors and output NOT a SLOP
		catch(Exception e) 
		{
			System.out.println(word + " is NOT a SLOP");
			return false;
		}
		
		// if all else fails, not a slop
		System.out.println(word + " is NOT a SLOP");
		return true;
	}
}
