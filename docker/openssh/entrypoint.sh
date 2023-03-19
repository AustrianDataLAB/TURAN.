#!/bin/sh

set -e

echo -e "$OPENSSH_ROOT_PASSWORD\n$OPENSSH_ROOT_PASSWORD" | passwd
/usr/bin/ssh-keygen -A
/usr/sbin/sshd -Deo "PermitRootLogin=yes"
