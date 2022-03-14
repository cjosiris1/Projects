#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include <stdbool.h>

// method to convert a number if it has a remainder
void decimalToBinary(int number, char* bits)
{
	// divide the number by 2 until process is complete
	int index = 0;
	int result = number;
	while(result != 0)
	{
		// calculate by using result % 2, check if there is a remainder in solution
		int remainder = result % 2;
		
		// if remainder, set bit in output binary bits array
		if(remainder > 0)
			bits[index] = '1';
			
		// setup for the next Binary Bit
		result = result/2;
		++index;
	}
}

// method to print all binary bits from the array 
void printBinary(char* bits)
{
	// print all binary bits from MSB (index 0) and MSB (index 31)
	for(int x = 31;x >= 0; --x)
	{
		printf("%c", bits[x]);
	}
	// skip line
	printf("\n");
}

// method to clear
void clearBinaryBits(char* bits)
{
	decimalToBinary(0, &bits[0]);
}

// method to convert the number into binary
void convertPrintBinary(int number, char* bits)
{
	clearBinaryBits(&bits[0]);
	decimalToBinary(number, &bits[0]);
	printBinary(&bits[0]);
}

// main
int main(int argc, const char * argv[])
{
	// declared
	int number = 0;
	bool ok = false;
	char bits[32] = { 				      //LSB
			   '0', '0','0','0','0','0','0','0',
			   '0', '0','0','0','0','0','0','0',
			   '0', '0','0','0','0','0','0','0',
			   '0', '0','0','0','0','0','0','0', // MSB
			 };
	// ask the user for a number between 0 and 1000
	while(!ok)
	{
		printf("\nDisplay a number between 0 and 1000: ");
		scanf("%d", &number);
		// error checking for number between 0 and 1000
		if(number < 0 || number > 1000)
		{
			printf("This number needs to be between 0 and 1000\n");
		}
		// print number
		else
		{
			ok = true;
		}
	}
	
	// display number as a 32 bit binary number
	printf("The number in binary is: ");
	convertPrintBinary(number, &bits[0]);
	
	// display the number as a 32 bit hexidecimal number
	printf("The number in hexidecimal is: 0x%08X\n", number);
	
	// shift the number 10 bits to the left, mask the lower 10 bits, and/or in 0x03FF
	int result = ((number << 10) & 0xFFFFFC00) | 0x03FF;
	
	// display the result in decimal, binary, and hexidecimal
	printf("The result in decimal is: %d\n", result);
	printf("The result in hexidecimal is: 0x%08X\n", result);
	printf("The result in binary is: ");
	convertPrintBinary(result, &bits[0]);
	
	// return ok
	return 0;
}
	
