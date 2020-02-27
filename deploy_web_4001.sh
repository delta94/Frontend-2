#!/bin/bash
####################################
#
# Build and deploy IZZI BOLN TEST at port 4001.
#
####################################

# Constant.
project_name="IZZI BOLN TEST"
port_deploy="4001"
deploy_dir="/home/ubuntu/www/web_4001"
base_dir="/home/ubuntu/git_project/izzi"

echo "Start script for $project_name"
cd $base_dir

#git pull
git checkout -- .
git pull https://<username>:<password>@gitlab.com/nam17983/izzi.git master

# copy file config
# cp -rf /home/ubuntu/config/pte-web-test/webpack.common.js $base_dir/webpack

# install modules
npm install

# clean and build
echo "NPM run webpack build"
npm run webpack:build

# deploy at port_deploy
echo "Deploy $project_name at $port_deploy"

sudo rm -rf $deploy_dir/*
cp -rf $base_dir/target/classes/static/* $deploy_dir

echo "Completed !"

