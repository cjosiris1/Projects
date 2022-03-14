#!/bin/bash

# echoes present directory
echo "$(pwd)"

# change to home directory
cd /home
pwd

# goes to child directory
cd cjosiris
cd Desktop
pwd

# grabs all .c files
cd Assignments
pwd
find -name "*.c" -type f

# returns to home directory
cd /home
pwd

