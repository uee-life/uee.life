FROM node:current as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
ENTRYPOINT npm run start

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app /app
COPY nginx.conf /etc/nginx/nginx.conf

