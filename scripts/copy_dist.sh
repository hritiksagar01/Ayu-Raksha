#!/bin/bash
# Remove old files from Nginx root
sudo rm -rf /var/www/html/*

# Copy new build files from the deployment folder (current directory)
sudo cp -r ./* /var/www/html/
