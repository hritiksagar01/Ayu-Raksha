#!/bin/bash
# Remove old files from Nginx root
sudo rm -rf /var/www/html/*
# Copy the new build files
sudo cp -r /home/ubuntu/Ayu-Raksha/dist/* /var/www/html/
