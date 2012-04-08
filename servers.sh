#!/bin/bash

echo "Launching MongoDB server..."
mongod --dbpath ./db/data --logpath ./db/logs/mongodb.log --logappend &

echo "Launching redis server..."
redis-server ./db/conf/redis.conf &