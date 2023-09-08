#!/bin/sh
chmod 777 /var/run/docker.sock
python3 manage.py createdata
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput
