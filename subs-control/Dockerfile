FROM node:20.14.0

ENV WEB_APP_PORT=4040

WORKDIR /opt

COPY app_subs-control ./app_subs-control

WORKDIR /opt/app_subs-control

RUN npm install

CMD ["npm", "start"]
# CMD ["npm", "run", "debug"]

EXPOSE 4040