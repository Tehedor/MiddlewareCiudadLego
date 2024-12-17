FROM minio/minio:RELEASE.2024-11-07T00-52-20Z-cpuv1

# Establecer las variables de entorno
ENV MINIO_ROOT_USER=admin
ENV MINIO_ROOT_PASSWORD=admin123

# Crear el directorio de datos
RUN mkdir -p /data

# Copiar el script de inicialización en la imagen
COPY init.sh /usr/local/bin/init.sh

# Dar permisos de ejecución al script de inicialización
RUN chmod +x /usr/local/bin/init.sh

# Exponer los puertos necesarios
EXPOSE 9000
EXPOSE 9001

# Comando para ejecutar Minio
CMD ["server", "/data", "--console-address", ":9001"]   
