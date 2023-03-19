FROM alpine:3.17
RUN apk add openssh
COPY --chown=root:root ./entrypoint.sh /
ENTRYPOINT /entrypoint.sh
