#!/bin/bash
# ARGUEMENTS
filename=$1
groupname=$2
flags=$3
errmsg=""
errflag='Error: Invalid Flag\n'
errnogroup='Error: Invalid Group\n'
errfile='Error: Invalid File\n'

if [[ ! $(getent group $2) ]] || [[ -z "$groupname" ]]; then # CHECK IF GROUP EXISTS
	errmsg=$errmsg$errnogroup
fi
if [[ ! "$flags" = "a" ]] && [[ ! "$flags" = "r" ]] || [[ -z "$flags" ]]; then # VALIDATE FLAG ARGUEMENT
	errmsg=$errmsg$errflag
	echo $flags
fi
if [[ -z "$filename" ]] || [[ ! -f "$filename" ]]; then # VALIDATE FILE
	errmsg=$errmsg$errfile
fi
if [[ ! $errmsg = "" ]]; then # EXIT PROGRAM IF ERROR
	echo -e $errmsg # PRINT ERRORS
	echo "Exiting the Program."
	exit
fi
if [[ "$flag" = "a" ]]; then # ADD USER
	echo "Adding the user."
while IFS=, read id username password;do
	sudo useradd -G $groupname $username # ADDS USER TO GROUP

	sudo usermod --password $password $username # ASSIGNS USER A PASSWORD

	sudo mkhomedir_helper $username # CREATES USER'S HOME DIRECTORY
	echo "User $username added to group $groupname!"
done < $filename # CLOSE FILE

elif [[ "$flags" = "r" ]]; then # REMOVES USER
	echo "Removing the user."
	while IFS=, read id username password;do
	sudo userdel -r $username 
	echo "User $username deleted!"
	echo "User $username's home directory has been deleted!"
done < $filename # CLOSE FILE
fi
