#!/bin/bash

WEB_PATH = '/home/www/pushgoing/wx'
WEB_USER = 'root'
WEB_USERGROUP = 'admin'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "changing permissiongs..."
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo "Finished."
