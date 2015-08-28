#!/bin/bash

apt-get install curl
curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -

apt-get install --yes nodejs

apt-get install --yes build-essential


npm install
npm install --global gulp

npm install --save-dev gulp

