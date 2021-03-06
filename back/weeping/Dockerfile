# Instructions from the app developer
# - you should use the 'node' official image, with the alpine 6.x branch
FROM alpine:latest

RUN apk add --update nodejs nodejs-npm
RUN apk add g++ make python

RUN npm install node-gyp -g
RUN npm install nodemon -g
RUN npm install sails -g
# - this app listens on port 3000, but the container should launch on port 80
  #  so it will respond to http://localhost:80 on your computer

# - then it should use alpine package manager to install tini: 'apk add --update tini'
# RUN apk add --update tini
# - then it should create directory /usr/src/app for app files with 'mkdir -p /usr/src/app'
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
# - Node uses a "package manager", so it needs to copy in package.json file
WORKDIR /usr/src/app
ENV NODE_PATH /usr/src/app/:$NODE_PATH
COPY package.json package.json

# - then it needs to run 'npm install' to install dependencies from that file
RUN npm install 
# - to keep it clean and small, run 'npm cache clean --force' after above
# - then it needs to copy in all files from current directory
ADD . /usr/src/app

RUN pwd
RUN ls -la ./config

# - then it needs to start container with command 'tini -- node ./bin/www'
# CMD ["forever", "start" ,"./app.js","--prod"]
# CMD ["node","./app.js","--prod"]
EXPOSE 1337
CMD ["node","./app.js"]