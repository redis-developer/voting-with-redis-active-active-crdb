FROM node:14.18.0-alpine

ARG REDIS_URL
ARG NEXT_PUBLIC_REGION

ENV REDIS_URL=$REDIS_URL
ENV NEXT_PUBLIC_REGION=$NEXT_PUBLIC_REGION

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD ["npm", "start"]
