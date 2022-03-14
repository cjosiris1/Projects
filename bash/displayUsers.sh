#!/bin/bash

# Return Users
getent passwd {1000..60000}

# Gets my user and test created user
getent passwd | grep cjosiris
getent passwd | grep test123

# Get Logged in Users over the time interval
last | grep -e 08:00:00 --> 05:00:00 
