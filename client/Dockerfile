# Use Node v8.9.0 LTS
FROM node:carbon

# Setup app working directory
RUN mkdir -p /usr/src/app/vrse-client
WORKDIR /usr/src/app/vrse-client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# additional copy for gatsbyjs
COPY gatsby-config.js .

# Copy your .env file to the container filesystem
# COPY .env .

# Copy sourcecode
COPY . .

# Start app
CMD [ "npm", "start" ]