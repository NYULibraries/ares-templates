#!/bin/bash

dist_dir=hosting-ares-nyu

if [[ -z "$1" ]]; then
  echo "Usage: "
  echo " $0 <env>"
  exit
fi

if [[ " dev prod " != *" $1 "* ]]; then
  echo "Invalid env, must be 'dev' or 'prod'"
  exit 1
fi

git submodule sync && git submodule update --init
git -C $dist_dir config core.autocrlf true
git -C $dist_dir checkout master && git -C $dist_dir pull

./compile.sh $1
git -C $dist_dir update-index --refresh
if ! git -C $dist_dir diff-index --quiet HEAD --; then
  echo "Failed test: compile $1 show uncommited changes to dist ($dist_dir)"
  exit 1
else
  echo "Success! Compile $1 shows no changes"
fi
