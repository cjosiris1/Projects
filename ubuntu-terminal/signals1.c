#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>
#include <sys/mman.h>
#include <errno.h>
#include <sys/wait.h>

// constants
int MAX = 100;
int WAKEUP = SIGUSR1;
int SLEEP = SIGUSR2;

// child PID of the parent, else the parent PID of the child
pid_t otherPid;

// signal set
sigset_t sigSet;

// shared buffer
struct CIRCULAR_BUFFER
{
	// # of items in buffer
	int count;
	
	// next slot read in buffer
	int lower;
	
	// next slot to write in buffer
	int upper;
	
	// slots in buffer
	int buffer[100];
};
struct CIRCULAR_BUFFER *buffer = NULL;

// sleeps current process until awoken
void sleepUntilWoken()
{
	int nSig;
	
	// sleep until told to wake up
	printf("Sleeping... \n");
	sigwait(&sigSet, &nSig);
	printf("Woken up!");
}

// put the process to sleep until its sent a WAKEUP signal
void sleepAndWait()
{
	int nSig;
	
	// sleep until told to wake up
	printf("Asleep.... Zzz...\n");
	sigwait(&sigSet, &nSig);
	printf("Awoken!\n");
}

// signal other processes to wake up
void wakeupOther()
{
	kill(otherPid, WAKEUP);
}

// gets value from the shared buffer
int getValue()
{
	// gets value from buffer and tells where to read next
	int value = buffer->buffer[buffer->lower];
	printf("	Consumer read %c\n", value);
	++buffer->lower;
	if(buffer->lower == MAX)
		buffer->lower = 0;
	--buffer->count;
	return value;
}

// puts value into the shared buffer
void putValue(int value)
{
	// writes to next available position in the buffer and tells where to write next
	buffer->buffer[buffer->upper] = value;
	printf("	Producer stored %c\n", buffer->buffer[buffer->upper]);
	++buffer->upper;
	if(buffer->upper == MAX)
		buffer->upper = 0;
	++buffer->count;
}

// consumer process
void consumer()
{
	// signal set
	sigemptyset(&sigSet);
	sigaddset(&sigSet, WAKEUP);
	sigprocmask(SIG_BLOCK, &sigSet, NULL);
	
	// run child consumer logic
	printf("Child Consumer Process is running...\n");
	
	// reads from shared buffer until 0 is recieved
	int character = 0;
	do
	{
		// wait to be notified until there is a character in shared buffer
		sleepAndWait();
		
		// read character from shared buffer until 0 has been recieved
		character = getValue();
	} while(character != 0);
	
	// exit
	printf("Exiting Child Consumer...\n");
	_exit(1);
}

// producer process
void producer()
{
	// buffer value to write
	int value = 0;
	
	// run parent producer logic
	printf("Parent Producer Process is running...\n");
	
	// send desired message to the child consumer
	char message[10] = "Osiris";
	for(int x = 0;x < strlen(message);++x)
	{
		// put next character into shared buffer, notify consumer, and sleep
		putValue(message[x]);
		wakeupOther();
		sleep(1);
	}
	
	// tell child consumer that all characters have been sent
	putValue(0);
	wakeupOther;
	
	// exit from producer
	printf("Exiting Parent Producer...\n");
	_exit(1);
}

// main
int main(int argc, char* argv[])
{
	// declared
	pid_t pid;
	
	// create shared memory for the circular buffer to share between parent/child
	buffer = (struct CIRCULAR_BUFFER*)mmap(0, sizeof(buffer), PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);
	buffer->count = 0;
	buffer->lower = 0;
	buffer->upper = 0;
	
	// use fork()
	pid = fork();
	if (pid == -1)
	{
		// if fork() returns -1 = ERROR
		printf("Can't fork, ERROR %d\n", errno);
		exit(EXIT_FAILURE);
	}
	
	//if fork() returns non zero then parent is running, else the child is running
	if (pid == 0)
	{
		// run producer logic as child
		otherPid = getppid();
		producer();
	}
	else
	{
		// run consumer logic as parent
		otherPid = pid;
		consumer();
	}
	
	// return ok
	return 0;
}









