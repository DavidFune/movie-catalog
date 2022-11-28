FROM node:14.15.4-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \
    git \
    ca-certificates \
    openjdk-11-jre

USER node
WORKDIR /home/node/app
CMD ["sh", "-c", "npm install && tail -f /dev/null" ]

