#!/bin/bash
LOGFILE=/home/ubuntu/logs/deploy.log
mkdir -p /home/ubuntu/logs
echo "===== copy_dist.sh started at $(date) =====" >> $LOGFILE 2>&1

echo "Removing old files from /var/www/html..." >> $LOGFILE 2>&1
rm -rf /var/www/html/* >> $LOGFILE 2>&1 2>/dev/null || echo "rm failed" >> $LOGFILE 2>&1

echo "Copying new build files..." >> $LOGFILE 2>&1
cp -r /home/ubuntu/Ayu-Raksha/dist/* /var/www/html/ >> $LOGFILE 2>&1 || echo "cp failed" >> $LOGFILE 2>&1

echo "Finished copy_dist.sh at $(date)" >> $LOGFILE 2>&1
