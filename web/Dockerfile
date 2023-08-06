FROM node:16-alpine
WORKDIR /web
COPY ./web .
RUN npm install --save
RUN npx tailwindcss -i ./src/index.css -o ./public/styles.css --watch
CMD ["npm", "start"]
