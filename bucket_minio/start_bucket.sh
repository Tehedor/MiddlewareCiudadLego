#!/bin/sh

MODE=$1

ruta=""
if [ "$MODE" = "service" ]; then
    ruta="./bucket_minio/"
fi

export COMPOSE_PROJECT_NAME=fiware


source ./zz_env_services/config_env_files.sh

docker compose ${envFileBucketMinio} -f ${ruta}bucket_minio_photo.yaml build
docker compose ${envFileBucketMinio} -f ${ruta}bucket_minio_photo.yaml up -d

# docker compose --env-file ../zz_env_services/bucket_minio.env -f $bucket_minio_photo.yaml up -d

# Esperar hasta que el contenedor minio esté saludable
CONTAINER_NAME=$(docker compose -f ${ruta}bucket_minio_photo.yaml ps -q minio)
while [ "$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER_NAME)" != "healthy" ]; do 
    echo "Esperando a que el contenedor minio esté saludable..."
    sleep 5
done

# Ejecutar el script de inicialización dentro del contenedor minio
docker exec -it $CONTAINER_NAME /bin/sh /usr/local/bin/init.sh