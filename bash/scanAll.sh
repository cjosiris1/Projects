#!/bin/bash

# scan all directories
ls /home/cjosiris #/[2+]

# point all directories to a file
ls /home/cjosiris > scannedDirectories.txt

# ALTERNATE CODE
# ls /home/cjosiris | grep *.txt > scannedDirectories.txt
