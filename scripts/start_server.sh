#!/bin/bash
echo starting server

# Setting necessary ENV variables.
export NEXT_PUBLIC_KELP_TOKEN_ADDRESS=0x91be212c43f7eb84f5f7e34fb5e2cbff4393b4ec
export NEXT_PUBLIC_CROWD_SALE_ADDRESS=0x76AD551B8ABEFa2Ee9EbD9a70003905D93e81236
export NEXT_PUBLIC_PROJECT_ID=ab8d50ad2e9c1825f5408b047b76ef24
export NEXT_PUBLIC_SALE_TYPE=0

# here we just use npm to run the build
cd /var/www/
echo building application...
sudo yarn run build

# start the application with pm2
echo starting application...
sudo pm2 start yarn -- run start
