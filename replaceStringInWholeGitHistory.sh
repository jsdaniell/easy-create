#!/bin/bash
# $1 - string to find
# $2 - string to replace with

for branch in $(git branch | cut -c 3-); do
  echo ""
  echo ">>> Replacing strings in branch $branch:"
  echo ""
  sh replaceStringInBranch.sh "$branch" "$1" "$2"
done