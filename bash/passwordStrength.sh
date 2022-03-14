#!/bin/bash
# ARGUEMENTS
minlength='^.{8,}$'
numbers='.*[0-9].*'
specials='.*[@#$%^&+=].*'
errmsg=""
errspecials='Password Error: Requires a special character\n'
errnumbers='Password Error: Requires a number\n'
errchar='Password Error: Requires more than 8 characters\n'

echo $@

if [[ ! "$@" =~ $minlength ]]; then # CHECKS FOR STANDARD 8 CHARACTERS
	errmsg=$errmsg$errchar
fi
	if [[ ! "$@" =~ $numbers ]]; then # CHECKS FOR NUMBERS
		errmsg=$errmsg$errnumbers
	fi
		if [[ ! "$@" =~ $specials ]]; then # CHECKS FOR SPECIAL CHARACTERS
			errmsg=$errmsg$errspecials
	fi
if [[ $errmsg == "" ]]
then
	echo "Password matches criteria"
else
	echo -e $errmsg
fi
