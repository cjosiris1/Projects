#!/bin/bash

# Search for charles through all names written in names.txt
for name in $( sort < names.txt )
do
	echo "Name is " $name
	if [ $name = "Charles" ]
	then
		echo "I have finally found myself"
	fi
done
