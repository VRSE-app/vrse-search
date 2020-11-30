# Use Node v8.9.0 LTS
FROM node:12

# Setup app working directory
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy sourcecode
COPY . .

# Start app
CMD [ "npm", "run", "dev" ]