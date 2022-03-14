#!/bin/bash

# change to home directory
cd /home

# make directory mycode
cd cjosiris
cd Desktop
mkdir mycode

# copy code
cd Assignments
cp /home/cjosiris/Desktop/Assignments/Activity2/*.c /home/cjosiris/Desktop/mycode
cp /home/cjosiris/Desktop/Assignments/Activity3/*.c /home/cjosiris/Desktop/mycode
cp /home/cjosiris/Desktop/Assignments/Activity4/*.c /home/cjosiris/Desktop/mycode
# NO .C FILES IN THESE DIRECTORIES ------------------------------------------------
# cp /home/cjosiris/Desktop/Assignments/Activity5/*.c /home/cjosiris/Desktop/mycode
# cp /home/cjosiris/Desktop/Assignments/Activity6/*.c /home/cjosiris/Desktop/mycode

# return to home directory
cd /home

# make directory mycode2
cd cjosiris
cd Desktop
cd Assignments
mkdir mycode2

# copy code from mycode to mycode2
cd /home/cjosiris/Desktop/mycode
cp *.c /home/cjosiris/Desktop/Assignments/mycode2

# return to home directory
cd /home
cd cjosiris
cd Desktop

# rename mycode to deadcode
mv mycode deadcode

# remove deadcode
rm -r deadcode
