#!/bin/sh -e

# Usage: ./upload.sh '*.html' [prod]
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
SFTP_HOST="sftp://$ARES_HOST"

if [ -n "$ENV" ] && [[ $ENV == 'prod' ]]
then
  ENV_FOLDER=''
else
  ENV_FOLDER='/TestWeb'
fi

lftp -u $USERNAME,$PASSWORD -e "cd RemoteAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $SFTP_HOST
lftp -u $USERNAME,$PASSWORD -e "cd AresAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $SFTP_HOST
