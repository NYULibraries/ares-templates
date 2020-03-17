FROM alpine:3.9.5

RUN addgroup -g 1000 -S docker && \
  adduser -u 1000 -S -G docker docker

RUN apk --no-cache add lftp openssh

USER docker

ENV ARES_HOSTNAME "ares.library.nyu.edu"
RUN mkdir ~/.ssh && ssh-keyscan -H "$ARES_HOSTNAME" >> ~/.ssh/known_hosts

WORKDIR /app
COPY . .

ENTRYPOINT ["./ftp.sh"]
CMD ["'*.html'"]
