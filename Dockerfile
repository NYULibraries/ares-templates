FROM alpine:3.9.5

RUN addgroup -g 1000 -S docker && \
  adduser -u 1000 -S -G docker docker

RUN apk --no-cache add lftp openssh

USER docker

RUN mkdir ~/.ssh && ssh-keyscan -H ares.library.nyu.edu >> ~/.ssh/known_hosts

WORKDIR /app
COPY . .

ENTRYPOINT ["./ftp.sh"]
CMD ["'*.html'"]
