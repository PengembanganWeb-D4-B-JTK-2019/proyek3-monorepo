FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 14418

CMD ["npm", "run", "serve:production", "--workspace=backend"]
