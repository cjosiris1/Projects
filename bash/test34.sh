#!/bin/bash

# information
name=Charles
age=21

# echoes information
echo $name $age

# echoes file name
echo "File Name: $0"
echo "First Parameter: $1"
echo "Second Parameter: $2"
echo "Quoted Values: $@"
echo "Quoted Values: $*"
echo "Total Number of Parameters: $#"
