#!/bin/bash
echo starting server

# here we just use npm to run the build
cd /var/www/
echo building application...
# Setting necessary ENV variables.
sudo cross-env NEXT_PUBLIC_KELP_TOKEN_ADDRESS=0xBc44461767CAD53e97dF961d7DBcFd95Eb39a064 NEXT_PUBLIC_CROWD_SALE_ADDRESS=0xd46eE8B6289D60FA677Ef258416a7f27fA50e1dA NEXT_PUBLIC_BUSD_ADDRESS=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56 NEXT_PUBLIC_PROJECT_ID=ab8d50ad2e9c1825f5408b047b76ef24 NEXT_PUBLIC_SALE_TYPE=0 yarn run build

# start the application with pm2
echo starting application...
sudo pm2 start yarn -- run start
sleep 10
