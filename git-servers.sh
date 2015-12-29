#!/bin/bash


cp config/servers/vps40041.public.cloudvps.com/files/config.json .
cp config/servers/vps40041.public.cloudvps.com/files/gulpfile.js .
cp config/servers/vps40041.public.cloudvps.com/files/panels/nide/data.json panels/nide/data.json


#git add --all . -f
git add .
#git reset -- data/accounts/easydrain/sites/*
git commit -m "cc"
git push  origin HEAD:gh-pages


cp config/servers/local/files/config.json .
cp config/servers/local/files/gulpfile.js .
cp config/servers/local/files/panels/nide/data.json panels/nide/data.json
