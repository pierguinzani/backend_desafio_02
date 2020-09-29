FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

COPY --chown=node:node . .

USER node

# EXPOSE 3000

# CMD [ "yarn", "start"]
