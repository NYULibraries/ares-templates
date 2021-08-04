#!/bin/bash

dist_dir=hosting-ares-nyu
subdir_list_dev="AresAuth_TestWeb   RemoteAuth_TestWeb"
subdir_list_prod="AresAuth           RemoteAuth"

if [[ -z "$1" ]]; then
  echo "Usage: "
  echo " $0 <env>"
  exit
fi

if [[ " dev prod " != *" $1 "* ]]; then
  echo "Invalid env, must be 'dev' or 'prod'"
  exit
fi

subdir_list=$subdir_list_$env

for subdir in $subdir_list
do
  rsync -a -v --delete-after src/ $dist_dir/$subdir/
done
