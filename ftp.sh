#!/bin/sh

# Usage: ./upload.sh '*.html' [testweb]
# Must set $USERNAME and $PASSWORD as environment variables

if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]
then
  echo "Must specify \$USERNAME and \$PASSWORD for authentication"
  exit 1
fi

#USERNAME=$1
#PASSWORD=$2
PATTERN=$1
ENV=$2
HOST="sftp://ares.library.nyu.edu"

if [[ $ENV == 'testweb' ]]; then
  ENV_FOLDER='/TestWeb'
else
  ENV_FOLDER=''
fi

lftp -u $USERNAME,$PASSWORD -e "cd RemoteAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $HOST
lftp -u $USERNAME,$PASSWORD -e "cd AresAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $HOST
