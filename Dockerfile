FROM node:10.13.0-alpine

# Set the default working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the relevant files to the working directory
COPY . .

# Build and export the app
RUN yarn build && yarn export -o /public
