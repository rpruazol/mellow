# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
RUN mkdir /src
WORKDIR /src

# Installing dependencies
COPY ./package.json /src
RUN npm install

# Copying all the files in our project
COPY . /src

EXPOSE 3001

# Starting our application
CMD npm start