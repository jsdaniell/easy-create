#!/bin/bash

# $1 - file name
# $2 - string to find
# $3 - string to replace

git filter-branch -f --tree-filter "if [ -f $1 ];then sed -i s/$2/$3/g $1;fi"
git commit -a -m "Replaced"