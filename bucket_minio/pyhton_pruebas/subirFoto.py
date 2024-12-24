from minio import Minio
from minio.error import S3Error  # Importar S3Error para manejar los errores

# Configuración de MinIO
minio_client = Minio(
    # "localhost:8080/minioBucket",  # Dirección de tu servidor MinIO
    "138.4.22.12:80",  # Dirección de tu servidor MinIO
    # "127.0.0.1:9000",  # Dirección de tu servidor MinIO
    access_key="admin",  # Tu access key
    secret_key="admin123",  # Tu secret key
    secure=False  # Establece en True si estás usando HTTPS
)

# Nombre del bucket y la carpeta
bucket_name = "bucketfotos"
folder_name = "photostrain"
file_path = "./train1.png"  # Ruta de la imagen en tu máquina local
object_name = f"{folder_name}/" + file_path.split("/")[-1]  # Nombre del archivo en el bucket

# Subir la imagen al bucket
try:
    # Verifica si el bucket existe, si no, crea uno
    if not minio_client.bucket_exists(bucket_name):
        print(f"Bucket {bucket_name} no existe, creándolo...")
        minio_client.make_bucket(bucket_name)

    # Subir el archivo
    minio_client.fput_object(bucket_name, object_name, file_path)
    print(f"Imagen subida exitosamente: {object_name}")
    
except S3Error as err:  # Captura errores de S3
    print(f"Error al subir la imagen: {err}")
