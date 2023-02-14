#!/bin/bash

# this file is being executed in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/

#stdout logs of this process executing can be found in /opt/codedeploy-agent/deployment-root/47../<deployment_id>/logs/scripts.log

# Introduce swap in lightsail memory
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# here we update the server and install node and npm
echo installing dependencies
sudo yum update -y
sudo yum install -y ruby wget
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install nodejs git openssh -y

# check to make sure the symbolic link for nodejs node exists
echo checking for nodejs symlink
file="/usr/bin/node"
if [ -f $file ] && [ ! -L $file ] ; then
  echo "$file exists and is not a symlink"
  sudo ln -s /usr/bin/nodejs
else
  echo "$file exists and is already a symlink"
fi

sudo npm install yarn -g

# install the application using npm
# we need to traverse to where the application bundle is copied too.
echo installing application with yarn
cd /var/www/
sudo yarn install

echo installing pm2
sudo npm install pm2 -g
sudo npm install cross-env -g
