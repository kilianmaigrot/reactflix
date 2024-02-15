FROM node:17.0.1-bullseye-slim

WORKDIR /app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install --force
COPY . ./

RUN chown -R node:node node_modules

EXPOSE 3001

# start app
CMD [ "npm", "start" ]