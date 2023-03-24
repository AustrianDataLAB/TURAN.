FROM alpine:3.17
RUN apk add openldap openldap-back-mdb openldap-clients && \
    install -o ldap -g ldap -d /etc/openldap/slapd.d && \
    rm /etc/openldap/slapd.conf && \
    mkdir /docker-entrypoint-initdb.d
COPY --chown=root:root ./entrypoint.sh /
ENTRYPOINT /entrypoint.sh
