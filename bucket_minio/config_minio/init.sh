#!/bin/sh
mc alias set pruebasBQ http://127.0.0.1:9000 admin admin123

mc alias set pruebasBQ http://localhost:8080 admin admin123

# Crear el bucket si no existe
if ! mc ls pruebasBQ/bucketfotos > /dev/null 2>&1; then
  mc mb pruebasBQ/bucketfotos
fi

# Crear la carpeta si no existe
if ! mc find pruebasBQ/bucketfotos --name "photostrain" --type d > /dev/null 2>&1; then
  mc mb pruebasBQ/bucketfotos/photostrain
fi

mc anonymous set download pruebasBQ/bucketfotos/photostrain
