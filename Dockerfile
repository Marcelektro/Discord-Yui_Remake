FROM node:16.19.0-alpine3.16

# Create the bot's dir
RUN mkdir -p /app
WORKDIR /app

# Copy package files
COPY package.json /app
COPY package-lock.json /app

# Copy all source files
COPY src/. /app

RUN npm install

# Default database path
RUN mkdir -p /data
ENV DATABASE_PATH /data/database.sqlite

# Start the bot
CMD ["node", "index.js"]
