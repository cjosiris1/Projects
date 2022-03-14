#1/bin/bash

# for loop to display number 1 to 10
for i in 1 2 3 4 5
do
	echo "Welcome $i times"
done

# for loop all files from ls command
for i in $(ls)
do
	echo item: $i
done
