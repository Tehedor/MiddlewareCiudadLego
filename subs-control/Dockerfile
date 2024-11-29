FROM node:20.14.0

ENV WEB_APP_PORT=4040
ENV BROKER_IP=138.4.22.12
ENV ENTITIES_ID=1

WORKDIR /opt

COPY app_subs-control ./app_subs-control

WORKDIR /opt/app_subs-control

RUN npm install

CMD ["npm", "start"]
# CMD ["npm", "run", "debug"]

EXPOSE 4040