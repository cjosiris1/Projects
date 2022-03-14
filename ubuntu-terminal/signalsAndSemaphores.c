#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <signal.h>
#include <semaphore.h>
#include <pthread.h>
#include <sys/mman.h>

// global variables
sem_t* semaphore;
pid_t otherPid;
sigset_t sigSet;

void signalHandler1(int signum)
{
	printf("Caught Signal: %d\n", signum);
	printf("	Exited Child Process.\n");
	sem_post(semaphore);
	_exit(0);
}

void signalHandler2(int signum)
{
	printf("I'm alive.\n");
}

// child process logic
void childProcess()
{
	// signal handlers
	signal(SIGUSR1, signalHandler1);
	signal(SIGUSR2, signalHandler2);
	
	// simulates a hung process waiting on a sempahore (sem_post) or running too long (sleep)
	int value;
	sem_getvalue(semaphore, &value);
	printf("	Child Process Semaphore count: %d.\n", value);
	printf("	Child Process is grabbing the semaphore.\n");
	sem_wait(semaphore);
	sem_getvalue(semaphore, &value);
	printf("	Child Process Semaphore count: %d.\n", value);
	
	// start of critical region
	printf("	Starting very long Child Process...\n");
	for(int x=0;x < 60; ++x)
	{
		printf(".\n");
		sleep(1);
	}
	
	// end of critical region
	sem_post(semaphore);
	
	// exit child process
	printf("	Exiting Child Process.\n");
	_exit(0);
}

// check hung child
void *checkHungChild(void *a)
{
	// simulate a timer of 10 seconds by going to sleep, check if semaphore is locked/hung
	int* status = a;
	printf("Checking for hung Child Process...\n");
	sleep(10);
	if (sem_trywait(semaphore) != 0)
	{
		printf("Child Process appears to be hung...\n");
		*status = 1;
	}
	else
	{
		printf("Child Process appears to be running fine...\n");
		*status = 0;
	}
	
	return NULL;
}

// parent process logic
void parentProcess()
{
	// parent process etects hung child process and kills it after time
	sleep(2);
	if(getpgid(otherPid) >= 0)
	{
		printf("Child Process is running...\n");
	}
	
	int value; 
	sem_getvalue(semaphore, &value);
	printf("In the Parent Process with Semaphore count: %d.\n", value);
	
	// try to get semaphore, if locked, start timer
	if (sem_trywait(semaphore) != 0)
	{
		// start timer and wait
		pthread_t tid1;
		int status = 0;
		printf("Detected Child is hung or running too long...\n");
		if (pthread_create(&tid1, NULL, checkHungChild, &status))
		{
			printf("ERROR creating timer thread!\n");
			_exit(1);
		}
		if (pthread_join(tid1, NULL))
		{
			printf("\n ERROR joining timer thread!\n");
			_exit(1);
		}
		
		// does child process need to be killed
		if(status == 1)
		{
			// kill child process
			printf("Killing Child Process with an ID of %d\n", otherPid);
			kill(otherPid, SIGTERM);
			printf("Child Process Killed.\n");
			
			// prove child process was killed
			printf("Proving Child Process is dead. (No dots and no response from SIGUSR2 signal)\n");
			sleep(5);
			kill(otherPid, SIGUSR2);
			sleep(1);
			printf("Done proving.\n");
		
			// try to get semaphore
			sem_getvalue(semaphore, &value);
			printf("In the Parent Process with a Semaphore count: %d.\n", value);
			if (sem_trywait(semaphore) != 0)
			{
				if(value == 0)
					sem_post(semaphore);
				printf("Cleaned up and got the semaphore.\n");
				sem_getvalue(semaphore, &value);
				printf("In the Parent Process with a Semaphore count: %d.\n", value);
			}
			else
			{
				printf("Got the semaphore!\n");
			}
		}
	}
	
	// exit
	printf("Exiting Parent Process.\n");
	_exit(0);
}

// main
int main(int argc, char* argv[])
{
	// declared 
	pid_t pid;
	
	// create shared semaphore
	semaphore = (sem_t*)mmap(0,sizeof(sem_t), PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);
	if(sem_init(semaphore, 1, 1) != 0)
	{
		printf("Failed to create semaphore.\n");
		exit(EXIT_FAILURE);
	}
	
	// use fork()
	pid = fork();
	if (pid == -1)
	{
		// if fork() returns -1, error
		printf("Can't fork, ERROR!\n");
		exit(EXIT_FAILURE);
	}
	
	// if fork() returns 0, then running
	if(pid == 0)
	{
		// run child process logic
		printf("	Started Child with a PID: %d...\n", getpid());
		otherPid = getppid();
		childProcess();
		
	}
	else
	{
		// run parent process logic
		printf("	Started Parent with a PID: %d...\n", getpid());
		otherPid = pid;
		parentProcess();
	
	}
	
	// destroy
	sem_destroy(semaphore);
	
	// return ok
	return 0;
}





