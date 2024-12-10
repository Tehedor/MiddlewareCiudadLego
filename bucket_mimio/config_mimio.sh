curl -k https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/

mc --help


# Configuracion debucket
# mc alias set local http://127.0.0.1:9000 admin admin123
mc alias set pruebasBQ http://localhost:9000 admin admin123

# mc mb local/pruebas-backups
mc mb images/trainPhotos


# Dar permisos de solo descarga a una carpeta de un folder 
mc anonymous set download imagenes/pruebas-backups/fotos
  -> download permite acceso publico de solo lectura  




# # Añadir files
# mc cp pruebas pruebasBQ/pruebas-backups/kworker01/despliegue/

