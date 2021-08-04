#!/bin/bash

dist_dir=hosting-ares-nyu
subdir_list=" AresAuth           AresAuth_TestWeb   RemoteAuth         RemoteAuth_TestWeb "

if [[ -z "$1" ]]; then
  echo "Usage: "
  echo " $0 <hosting-ares-nyu subdir>"
  echo "     valid subdirs: ${subdir_list}"
  exit
fi

if [[ $subdir_list != *" $1 "* ]]; then
  echo "Must specify a valid subdir: ${subdir_list}"
  exit
fi

rsync -a -v --delete-after $dist_dir/$1/ src
