# Use Node v8.9.0 LTS
FROM node:carbon

# Setup app working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install

COPY gatsby-config.js .

# Copy your .env file to the container filesystem
# COPY .env .

# Copy sourcecode
COPY . .

# Start app
CMD [ "npm", "start" ]