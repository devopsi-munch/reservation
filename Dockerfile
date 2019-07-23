FROM node:8.16.0

ARG APP_DIR=/src/app

RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt

RUN mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}

COPY . ${APP_DIR}

RUN npm ci

EXPOSE 3001

CMD npm run database && \
  npm run seed && \
  npm run webpack-dev && \
  npm run server-dev
