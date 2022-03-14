#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <errno.h>

// declarables
pthread_mutex_t mutex;
long counter;
time_t end_time;

// counter thread increments a count protected by a mutex
void *counter_thread (void *arg)
{
	// declared
	int status;
	
	// increment the counter for the specified amount of time and sleep with mutex locked
	while (time (NULL) < end_time)
	{
		// start of critical region
		status = pthread_mutex_lock (&mutex);
		if (status == 0)
			printf ("Counter Thread: Locked mutex for Counter so it can be incremented\n");
		++counter;
		status = pthread_mutex_unlock (&mutex);
		if (status == 0)
			printf ("Counter Thread: Unlocked mutex since incrementing is finished\n");
			
		// end of critical region
		
		// sleep for a second
		sleep(1);
	}
	
	// print final value of the counter
	printf("Final Counter Value: '%lu'\n", counter);
	return NULL;
}

// monitor thread gets mutex and if locked, keeps track of missed counts, else prints value
void *monitor_thread (void *arg)
{
	int status;
	int misses = 0;
	
	// gets mutex for specified duration. if locked, counts. else, prints
	while (time(NULL) < end_time)
	{
		// sleep to give counter thread time to run
		sleep(3);
		
		// try to get mutex, access the counter and print. Else, count misses
		status = pthread_mutex_trylock (&mutex);
		if (status != EBUSY)
		{
			printf("	Monitor Thread: The trylock will lock so the Counter can be read safely\n");
			printf("	Monitor Thread: The Counter from Monitor is '%ld'\n", counter);
			status == pthread_mutex_unlock (&mutex);
			if(status == 0)
				printf("	Monitor will now unlock mutex since Counter has finished\n");
		}
		else
		{
			// count misses while locked
			++misses;
		}
	}
	
	//print number of misses
	printf("Final Monitor Thread missed '%d' times.\n", misses);
	return NULL;
}

int main(int argc, char *argv[])
{
	int status;
	pthread_t counter_thread_id;
	pthread_t monitor_thread_id;
	
	// initialize mutex
	pthread_mutex_init(&mutex, 0);
	
	// set end time in 60 seconds
	end_time = time (NULL) + 60;
	
	// create counter and monitor threads
	if(pthread_create (&counter_thread_id, NULL, counter_thread, NULL))
		printf("Create counter thread failed.");
	if(pthread_create (&monitor_thread_id, NULL, monitor_thread, NULL))
		printf("Create monitor thread failed.");
		
	// wait for coutner and monitor threads to finish
	if(pthread_join (counter_thread_id, NULL))
		printf("Join counter thread failed.");
	if(pthread_join (monitor_thread_id, NULL))
		printf("Join monitor thread failed.");
	
	// destroy mutex once completed	
	pthread_mutex_destroy(&mutex);
	
	// exit ok
	return 0;
}
	
	
	
	
	
	
	
	
