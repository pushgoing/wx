#!/bin/bash

echo "Start deployment"
cd /home/www/pushgoing/wx/
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "Finished."
