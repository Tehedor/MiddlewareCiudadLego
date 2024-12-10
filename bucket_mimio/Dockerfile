# docker run -d -p 9000:9000 -p 9001:9001 \
#   --name minio \
#   -e "MINIO_ROOT_USER=admin" \
#   -e "MINIO_ROOT_PASSWORD=admin123" \
#   -v /data:/data \
#   quay.io/minio/minio server /data --console-address ":9001"
# Usar una imagen base de Minio
# FROM quay.io/minio/minio
# docker pull minio/minio:RELEASE.2024-11-07T00-52-20Z-cpuv1
FROM minio/minio:RELEASE.2024-11-07T00-52-20Z-cpuv1

# Establecer las variables de entorno
ENV MINIO_ROOT_USER=admin
ENV MINIO_ROOT_PASSWORD=admin123

# Crear el directorio de datos
RUN mkdir -p /data

# Exponer los puertos necesarios
EXPOSE 9000
EXPOSE 9001

# Comando para ejecutar Minio
CMD ["server", "/data", "--console-address", ":9001"]

# docker build -t my-minio-image .
# docker run -d -p 9000:9000 -p 9001:9001 --name minio -v /data:/data my-minio-image