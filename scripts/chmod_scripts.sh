#!/bin/bash
LOGFILE=/home/ubuntu/logs/deploy.log
mkdir -p /home/ubuntu/logs
echo "===== chmod_scripts.sh started at $(date) =====" >> $LOGFILE 2>&1

chmod +x /home/ubuntu/Ayu-Raksha/scripts/*.sh >> $LOGFILE 2>&1 || echo "chmod failed" >> $LOGFILE 2>&1

echo "Finished chmod_scripts.sh at $(date)" >> $LOGFILE 2>&1
