FROM node:22

WORKDIR /Instagram-clone/client

COPY client/package.json .
COPY client/package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]