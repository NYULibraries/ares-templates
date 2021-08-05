#!/bin/bash

dist_dir=hosting-ares-nyu
subdir_list=" AresAuth           AresAuth_TestWeb   RemoteAuth         RemoteAuth_TestWeb "
default_subdir="AresAuth_TestWeb"

#if [[ -z "$1" ]]; then
#  echo "Usage: "
#  echo " $0 <hosting-ares-nyu subdir>"
#  echo "     valid subdirs: ${subdir_list}"
#  exit
#fi

if [[ -z "$1" ]]; then
  subdir=$default_subdir
elif [[ $subdir_list == *" $1 "* ]]; then
  subdir=$1
else
  echo "Must specify a valid subdir: ${subdir_list}"
  exit 1
fi

rsync -a -v --delete-after $dist_dir/$subdir/ src/
