#!/bin/bash
LOGFILE=/home/ubuntu/logs/deploy.log
mkdir -p /home/ubuntu/logs
echo "===== restart.sh started at $(date) =====" >> $LOGFILE 2>&1

echo "Restarting nginx..." >> $LOGFILE 2>&1
systemctl restart nginx >> $LOGFILE 2>&1 || echo "nginx restart failedd" >> $LOGFILE 2>&1

echo "Finished restart.sh at $(date)" >> $LOGFILE 2>&1
