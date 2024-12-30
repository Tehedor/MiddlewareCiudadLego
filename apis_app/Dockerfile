# Usa una imagen base oficial de Node.js
FROM node:14

ENV NODE_ENV=container

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el resto de los archivos del proyecto
COPY ./CityApiV3 .

RUN npm install

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["node", "app.js"]