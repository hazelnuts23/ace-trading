FROM node:16-alpine
WORKDIR /api
COPY ./api .
RUN npm install nodemon -g
RUN npm install ts-node
RUN npm install --save
CMD ["npm", "run", "dev"]
