#!/bin/bash


git add --all . -f
#git reset -- data/accounts/easydrain/sites/*
git commit -m "cc"
git push  origin HEAD:gh-pages
