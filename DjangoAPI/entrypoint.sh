#!/bin/sh
python3 manage.py migrate --noinput
python3 manage.py createdata
python3 manage.py runserver 