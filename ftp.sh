#!/bin/bash

# Usage: ./upload.sh myUser 'myPa55w0rd!' '*.html' [testweb]

USERNAME=$1
PASSWORD=$2
PATTERN=$3
ENV=$4
HOST="sftp://ares.library.nyu.edu"

if [[ $ENV == 'testweb' ]]; then
  ENV_FOLDER='/TestWeb'
else
  ENV_FOLDER=''
fi

lftp -u $USERNAME,$PASSWORD -e "cd RemoteAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $HOST