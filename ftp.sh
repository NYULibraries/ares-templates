#!/bin/bash

USERNAME=$1
PASSWORD=$2
PATTERN=$3
HOST="sftp://ares.library.nyu.edu"

lftp -u $USERNAME,$PASSWORD -e "cd RemoteAuth; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $HOST