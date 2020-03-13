FROM alpine:3.9.5

RUN apk --no-cache add lftp openssh
RUN mkdir ~/.ssh && ssh-keyscan -H ares.library.nyu.edu >> ~/.ssh/known_hosts

WORKDIR /app
COPY . .

CMD ["sh", "-c", "./ftp.sh ${USERNAME} ${PASSWORD} '*.html' testweb"]
