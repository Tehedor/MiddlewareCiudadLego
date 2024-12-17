FROM node:20.14.0

ENV WEB_APP_PORT=4040
ENV ACTUATORS_IP=138.4.22.50
ENV ENTITIES_ID=001

ENV MODE_CONTAINERS=true
ENV MONGO_DB_PORT=27017


ENV INI_STATE="simulator" 
# ENV INI_STATE="real" 


WORKDIR /opt

COPY app_subs-control ./app_subs-control

WORKDIR /opt/app_subs-control

RUN npm install

CMD ["npm", "start"]
# CMD ["npm", "run", "debug"]

EXPOSE 4040