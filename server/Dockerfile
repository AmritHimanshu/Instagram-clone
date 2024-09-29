FROM node:22

WORKDIR /Instagram-clone/server

COPY server/package.json .
COPY server/package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "dev" ]