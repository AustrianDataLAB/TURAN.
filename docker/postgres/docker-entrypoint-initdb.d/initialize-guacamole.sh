#!/bin/bash

set -e

psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" < /opt/guacamole/postgresql/schema/001-create-schema.sql
sed "s/guac\(admin\)/\1/g" /opt/guacamole/postgresql/schema/002-create-admin-user.sql | psql -d "$POSTGRES_DB" -U "$POSTGRES_USER"
