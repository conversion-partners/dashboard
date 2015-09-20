#!/bin/sh

OUTPUT="$(git status --porcelain | wc -l)"
echo "${OUTPUT}"


if [ $OUTPUT -gt 0 ]; then
   
    echo "changed "
    git add --all . -f
    git commit -m 'key'
    git push -u origin master

fi







