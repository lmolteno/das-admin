#!/bin/sh

export PGPASSWORD=password
echo "SELECT 'CREATE DATABASE das' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'das')\gexec" | psql -h db -p 5432 -U user

npx prisma migrate deploy

HOSTNAME="0.0.0.0" node server.js