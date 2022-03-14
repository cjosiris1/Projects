#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include <time.h>
#include <semaphore.h>

#define THREAD_NUM 2

// semaphore
sem_t semEmpty;
sem_t semFull;

//mutex
pthread_mutex_t mutexBuffer;

int buffer[100];
int count = 0;

// parent process
void* producer(void* args) 
{
	while(1) 
	{
		// produce
		int x = rand() % 100;
		
		// check if consumer is empty
		sem_wait(&semEmpty);
		
		// lock buffer
		pthread_mutex_lock(&mutexBuffer);
		
		// add to the buffer
		buffer[count] = x;
		count++;
		
		// unlock buffer
		pthread_mutex_unlock(&mutexBuffer);
		
		// check if consumer is full
		sem_post(&semFull);
		
		// producer return number
		printf("Producer found %d\n", x);
	
	}
}

// child process
void* consumer(void* args) 
{
	while (1) 
	{
	
		int y;
		
		// check if consumer is full
		sem_wait(&semFull);
		
		// lock buffer
		pthread_mutex_lock(&mutexBuffer);
		
		// remove from the buffer
		y = buffer[count - 1];
		count --;
		
		// unlock buffer
		pthread_mutex_unlock(&mutexBuffer);
		
		// check if consumer is empty
		sem_post(&semEmpty);
		
		// consumer return number
		printf("Consumer returned %d\n", y);
		
		// wait to list 
		sleep(1);
	
	}
}

int main(int argc, char* argv[]) 
{
	// declared
	int i;
	srand(time(NULL));
	pthread_t th[THREAD_NUM];
	pthread_mutex_init(&mutexBuffer, NULL);
	
	// 10 to tell the buffer to load
	sem_init(&semEmpty, 0, 10);
	
	// 0 because it would not have space
	sem_init(&semFull, 0, 0);
	
	for (i = 0; i < THREAD_NUM; i++)
	{
		if (i % 2 ==0)
		{
			if (pthread_create(&th[i], NULL, &producer, NULL) != 0) 
			{
				perror("Failed to create thread");
			}
		}
		
		else
		{
			if(pthread_create(&th[i], NULL, &consumer, NULL) != 0) 
			{
				perror("Failed to create thread");
			}
		}
	}
	for (i = 0; i < THREAD_NUM; i++)
	{
		if (pthread_join(th[i], NULL) != 0) 
		{
			perror("Failed to join thread");
		}
	}
	
	// destroy once completed
	sem_destroy(&semEmpty);
	sem_destroy(&semFull);
	pthread_mutex_destroy(&mutexBuffer);
	return 0;
			
}




