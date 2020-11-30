# Use Node v8.9.0 LTS
FROM node:12

# Setup app working directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Gatsby CLI
RUN npm install -g gatsby-cli

# Install app dependencies
RUN npm install

# additional copy for gatsbyjs
COPY gatsby-config.js .

# Copy your .env file to the container filesystem
# COPY .env .

# Copy sourcecode
COPY . .

# Start app
# CMD [ "npm", "start" ]
CMD ["gatsby", "develop", "-H", "0.0.0.0"]