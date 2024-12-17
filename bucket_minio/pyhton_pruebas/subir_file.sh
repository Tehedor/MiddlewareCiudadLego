#!/bin/sh

# Ruta del archivo a descargar
FILE_PATH="$HOME/minio-binaries/mc"

# Verificar si el archivo ya existe
if [ ! -f "$FILE_PATH" ]; then
  echo "Descargando el cliente MinIO..."
  curl -k https://dl.min.io/client/mc/release/linux-amd64/mc \
    --create-dirs \
    -o $FILE_PATH
else
  echo "El cliente MinIO ya está descargado en $FILE_PATH"
fi

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/

mc alias set pruebasBQ http://127.0.0.1:8080/minioBucket admin admin123

mc cp train.png pruebasBQ/bucketfotos/photostrain/
