#!/bin/bash
# $1 - branch
# $2 - string to find
# $3 - string to replace with

git checkout $1
for file in $(sh findFilesContainingStringInBranch.sh "$2"); do
  echo "          Filtering file $file:"
  sh changeStringsInFileInCurrentBranch.sh "$file" "$2" "$3"
done