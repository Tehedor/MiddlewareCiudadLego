# Usa una imagen base oficial de Node.js
FROM node:22.12.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY ./CityApiV2/package*.json ./
RUN echo "Archivos package.json y package-lock.json copiados"
RUN ls -la /usr/src/app

# Instala las dependencias del proyecto
RUN npm install
RUN echo "Dependencias instaladas"
RUN ls -la /usr/src/app

# Copia el resto de los archivos del proyecto
COPY ./CityApiV2 .
RUN echo "Archivos del proyecto copiados"
RUN ls -la /usr/src/app

# Construye el proyecto
RUN npm run build
RUN echo "Proyecto construido"
RUN ls -la /usr/src/app

# Establece las variables de entorno
ENV SERVER_PORT=3001
ENV JWT_SECRET_KEY=ypb7SBzJ+3E6wXVy0dXQvAsyj7EYzFAhLBZ+CVmpdsCFK90OmwrU1VMykEl5hjHnKg/fjnjAsUCiQ+FMyYCkeg==
ENV ADMIN_EMAIL=admin@pass.es
ENV ADMIN_PASSWORD=admin1234
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=12345678
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379
ENV LIMIT_API_KEY=10
ENV TIME_LIMIT_API_KEY_M=1
ENV MODE_CONTAINTER=true
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/apisApp

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000
EXPOSE 3001

# Define el comando para ejecutar la aplicación
CMD ["sh", "-c", "npm run init-admin && npm start"]