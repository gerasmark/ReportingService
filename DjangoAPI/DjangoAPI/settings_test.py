from .settings import *

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'CLIENT': {
            "host": "mongodb+srv://intrasoft:intrasoft@cluster0.c8m3z3m.mongodb.net/Database?retryWrites=true&w=majority",
            "name": "Database",
            "authMechanism": "SCRAM-SHA-1"
        }
    }
}