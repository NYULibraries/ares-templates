#!/bin/sh -e

# Usage: ./upload.sh '*.html' [prod]
# Must set $SFTP_USERNAME and $SFTP_PASSWORD as environment variables

if [ -z "$SFTP_USERNAME" ] || [ -z "$SFTP_PASSWORD" ]
then
  echo "Must specify \$SFTP_USERNAME and \$SFTP_PASSWORD for authentication"
  exit 1
fi

PATTERN=$1
ENV=$2
SFTP_HOST="sftp://$ARES_HOSTNAME"

if [ -n "$ENV" ] && [[ $ENV == 'prod' ]]
then
  ENV_FOLDER=''
else
  ENV_FOLDER='/TestWeb'
fi

lftp -u $SFTP_USERNAME,$SFTP_PASSWORD -e "cd RemoteAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $SFTP_HOST
lftp -u $SFTP_USERNAME,$SFTP_PASSWORD -e "cd AresAuth$ENV_FOLDER; mirror -R ./dist/custom ./custom; mput ./dist/$PATTERN; exit" $SFTP_HOST
