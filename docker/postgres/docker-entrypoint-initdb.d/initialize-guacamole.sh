#!/bin/bash

set -e

psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" < /opt/guacamole/postgresql/schema/001-create-schema.sql
sed "s/guac\(admin\)/\1/g" /opt/guacamole/postgresql/schema/002-create-admin-user.sql | psql -d "$POSTGRES_DB" -U "$POSTGRES_USER"
for i in $GUACAMOLE_GROUPS
do
	echo "INSERT INTO guacamole_entity (name,type) VALUES ('${i%:*}','USER_GROUP');" | psql -d "$POSTGRES_DB" -U "$POSTGRES_USER"
	entity_id=$(echo "SELECT entity_id FROM guacamole_entity WHERE name = '${i%:*}';" | psql -Atd "$POSTGRES_DB" -U "$POSTGRES_USER")
	echo "INSERT INTO guacamole_user_group (entity_id,disabled) VALUES ($entity_id,false);" | psql -d "$POSTGRES_DB" -U "$POSTGRES_USER"
	IFS=","
	for j in ${i##*:}
	do
		if [[ "$j" =~ ^(ADMINISTER|CREATE_((CONNECTION|USER)(_GROUP)?|SHARING_PROFILE))$ ]]
		then
			echo "INSERT INTO guacamole_system_permission (entity_id,permission) VALUES ('$entity_id','$j');" | psql -d "$POSTGRES_DB" -U "$POSTGRES_USER"
		fi
	done
done
