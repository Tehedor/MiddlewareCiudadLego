import sys
# import docker
import subprocess

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Inicial
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def nginx_config():
    return \
"""server {
    listen       80;
    listen  [::]:80;
    server_name  138.4.22.12;

    resolver 127.0.0.11 valid=30s;

    # location / {
    #     root   /usr/share/nginx/html;
    #     index  index.html index.htm;
    # }
"""

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Final
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def nginx_config_end():
    return \
"""
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
"""

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Orion Config
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def append_orion():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### # ## ### ### ### ### ###
    # ### ### Orion
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location ~ ^/orion(.*)$ {
        proxy_pass http://orion:1026$1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /mongoOrion/ {
        rewrite ^/mongoOrion/(.*)$ /$1 break;
        proxy_pass http://mongo-express-orion:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Reescrirbr las URLs en el contenido del HTML
        sub_filter 'href="/' 'href="/mongoOrion/';
        sub_filter 'src="/' 'src="/mongoOrion/';
        sub_filter_once off;
    }
"""

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Draco Config
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def append_draco():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### Draco
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location /draco/nifi/ {
        rewrite ^/draco/nifi/(.*)$ /nifi/$1 break;
        proxy_pass http://draco:9090/nifi/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /draco/nifi-api/ {
        rewrite ^/draco/nifi-api/(.*)$ /nifi-api/$1 break;
        proxy_pass http://draco:9090;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Content-Length $http_content_length;
        proxy_set_header Content-Type $http_content_type;
    }

    location /nifi-api/ {
        proxy_pass http://draco:9090/nifi-api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location ~* ^/draco/?$ {
        return 301 $scheme://$host/draco/nifi/;
    }
    
    
    location /mongoDraco/ {
        rewrite ^/mongoDraco/(.*)$ /$1 break;
        proxy_pass http://mongo-express-draco:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Reescrirbr las URLs en el contenido del HTML
        sub_filter 'href="/' 'href="/mongoDraco/';
        sub_filter 'src="/' 'src="/mongoDraco/';
        sub_filter_once off;
    }
    
    

"""
    
    
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # SubsControlApp Config
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def append_subscontrolapp():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### SubsControlApp 
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location /subsControlApp/ {
        # Reescribe las rutas entrantes eliminando el prefijo /subsControlApp/
        rewrite ^/subsControlApp/(.*)$ /$1 break;

        # Redirige la solicitud al backend
        proxy_pass http://subsControlApp:4040/;

        # Encabezados para la solicitud al backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar las rutas en las respuestas del backend
        # Asegura que las rutas devueltas sean relativas a /subsControlApp
        sub_filter 'href="/' 'href="/subsControlApp/';
        sub_filter 'src="/' 'src="/subsControlApp/';
        sub_filter_once off;
    }

"""

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Simulator Config
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def append_simulator():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### Simulator
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location /simulatorApp/ {
        rewrite ^/simulatorApp/(.*)$ /$1 break;
        
        proxy_pass http://simulatorApp:3030/;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar las rutas en las respuestas del backend
        # Asegura que las rutas devueltas sean relativas a /subsControlApp
        sub_filter 'href="/' 'href="/simulatorApp/';
        sub_filter 'src="/' 'src="/simulatorApp/';
        sub_filter_once off;
    }
    
    location /socket.io/ {
        rewrite ^/socket.io/(.*)$ /$1 break;
        proxy_pass http://simulatorApp:3030/socket.io/;

        # Configuraciones para WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Encabezados adicionales
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Tiempo de espera (ajustar según las necesidades del WebSocket)
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;

        # Evitar compresión para evitar problemas con WebSocket
        proxy_buffering off;
    }
"""

## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
## ----- # Minio Bucket Config
## ----- # ----- # ----- # ----- # ----- # ----- # ----- ##
def append_minioBucket():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### MiniBucket
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # Configuración para manejar MinIO Console
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 300;
        
        # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        chunked_transfer_encoding off;

        proxy_pass http://minioBucket:9000;
    }

    location /minioConsole/ {
        rewrite ^/minioConsole/(.*) /$1 break;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-NginX-Proxy true;

        # This is necessary to pass the correct IP to be hashed
        real_ip_header X-Real-IP;
        proxy_connect_timeout 300;

        # To support websockets in MinIO versions released after January 2023
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        chunked_transfer_encoding off;
        proxy_pass http://minioBucket:9001;
    }

"""


def append_apisApp():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### Apis App
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    
    # // // // // // // // // // // // // // // // // // // // // // // // 
    # // ApisApp
    # // // // // // // // // // // // // // // // // // // // // // // // 
    location = /apisApp/ {
        return 301 $scheme://$host/apisApp/login;
    }

    
    location /apisApp/ {
        # Redirige la solicitud al backend
        proxy_pass http://apis-app:3000/apisApp/;

        # Encabezados para la solicitud al backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar las rutas en las respuestas del backend 
        sub_filter_once off;
        sub_filter "href='/" "href='/apisApp/";
        sub_filter "src='/" "src='/apisApp/";
        sub_filter "action='/" "action='/apisApp/";
        sub_filter "url='/" "url='/apisApp/";
    }
    
    # // // // // // // // // // // // // // // // // // // // // // // // 
    # // Api
    # // // // // // // // // // // // // // // // // // // // // // // // 
    # Manejo de Swagger UI
    location /api/api-docs/ {
        proxy_pass http://apis-app:3001/api-docs/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar URLs internas de Swagger
        sub_filter_once off;
        sub_filter '/api-docs/' '/api/api-docs/';
        sub_filter 'Swagger UI' 'API Documentation';
    }


    location /api/images/ {
        proxy_pass http://apis-app:3001/images/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar URLs internas de Swagger
        sub_filter_once off;
        sub_filter '/images/' '/api/images/';
    }
    
    location /api/stylesheets/ {
        proxy_pass http://apis-app:3001/stylesheets/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Ajustar URLs internas de Swagger
        sub_filter_once off;
        sub_filter '/stylesheets/' '/api/stylesheets/';
    }

    # Redirección de /api/ al índice del backend (indexRouter)
    location = /api/ {
        proxy_pass http://apis-app:3001/;  # La barra final es clave aquí
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Reescribir URLs en el HTML para que apunten a /api/
        sub_filter_once off;

        sub_filter 'src="/' 'src="/api/';

        sub_filter "href='/api/api-docs/'" "href='/api/api/api-docs/'";

        sub_filter "href='/" "href='/api/";
        sub_filter "src='/" "src='/api/";
        sub_filter "action='/" "action='/api/";
        sub_filter "'/api-docs'" "'/api/api-docs'";  # Específico para Swagger
    }

    # Manejo de los endpoints bajo /api/*
    location /api/ {
        proxy_pass http://apis-app:3001/api/;  # Barra final para preservar la ruta
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
"""
# def append_apisApp():
#     return \
# """
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     # ### ### Apis App
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     location /api/ {
#         # Eliminar el prefijo /api/ antes de enviar al backend
#         rewrite ^/api/(.*) /$1 break;

#         proxy_pass http://apis-app:3001;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;

#         # Reescribir todas las URLs en las respuestas
#         sub_filter_once off;

#         sub_filter 'src="/' 'src="/api/';

#         sub_filter "href='/api/api-docs/'" "href='/api/api/api-docs/'";

#         sub_filter "href='/" "href='/api/";
#         sub_filter "src='/" "src='/api/";
#         sub_filter "action='/" "action='/api/";
#         sub_filter "'/api-docs'" "'/api/api-docs'";  # Específico para Swagger
#     }

#     location /apisApp/ {
#         # Redirige la solicitud al backend
#         proxy_pass http://apis-app:3000/apisApp/;

#         # Encabezados para la solicitud al backend
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;

#         # Ajustar las rutas en las respuestas del backend 
#         sub_filter_once off;
#         sub_filter "href='/" "href='/apisApp/";
#         sub_filter "src='/" "src='/apisApp/";
#         sub_filter "action='/" "action='/apisApp/";
#         sub_filter "url='/" "url='/apisApp/";
#     }
# """




# def append_minioBucket():
#     return \
# """
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     # ### ### MiniBucket
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     # Configuración para manejar MinIO Console
#     location /minioBucket/ {
#         rewrite ^/minioBucket/(.*) /$1 break;
#         proxy_set_header Host $http_host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;

#         proxy_connect_timeout 300;
        
#         # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
#         proxy_http_version 1.1;
#         proxy_set_header Connection "";
#         chunked_transfer_encoding off;

#         proxy_pass http://minioBucket:9000;
#     }

#     location /minioConsole/ {
#         rewrite ^/minioConsole/(.*) /$1 break;
#         proxy_set_header Host $http_host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#         proxy_set_header X-NginX-Proxy true;

#         # This is necessary to pass the correct IP to be hashed
#         real_ip_header X-Real-IP;
#         proxy_connect_timeout 300;

#         # To support websockets in MinIO versions released after January 2023
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection "upgrade";

#         chunked_transfer_encoding off;
#         proxy_pass http://minioBucket:9001;
#     }

# """


# Buscar contenedores activos
def get_active_containers():
    # result = subprocess.run(['docker', 'ps', '-a', '--format', '{{.Names}}'], stdout=subprocess.PIPE)
    result = subprocess.run(['docker', 'ps', '--format', '{{.Names}}'], stdout=subprocess.PIPE)
    containers = result.stdout.decode('utf-8').strip().split('\n')
    active_services = []
    
    for container in containers:
        # container_name = container.name.lower()
        container_name = container.lower()
        if "fiware-orion" == container_name:
            active_services.append("fiware-orion")
        if "draco" == container_name:
            active_services.append("draco")
        if "simulator-app" == container_name:
            active_services.append("simulator-app")
        if  "subs-control-app" == container_name:
            active_services.append("subs-control-app")
        if "minio-bucket" == container_name:
            active_services.append("minio-bucket")
        if "apis-app" == container_name:
            active_services.append("apis-app")
    
    return active_services

# Generador de configuración de Nginx
def generate_nginx_config(exclude_containers=None):
    # Inicializar configuración
    config = nginx_config()
    active_containers = get_active_containers()

    
    active_services = [service for service in active_containers if exclude_containers is None or service not in exclude_containers]
        

    for active_service in active_services:
        print(f"Servicio activo: {active_service}") 

    # Configuración de servicios
    if 'fiware-orion' in active_services:
        config += append_orion()
        print("Orion configurado")
    if 'draco' in active_services:
        config += append_draco()
        print("Draco configurado")
    if 'simulator-app' in active_services:
        config += append_simulator()
        print("Simulator configurado")
    if 'subs-control-app' in active_services:
        config += append_subscontrolapp()
        print("SubsControlApp configurado")
    if 'apis-app' in active_services:
        config += append_apisApp()
        print("ApisApp configurado")    
    if 'minio-bucket' in active_services:
        config += append_minioBucket()
        print("MinioBucket configurado")
    # Configuracion final
    config += nginx_config_end()

    
    return config

# Escribir configuración de Nginxs
def write_nginx_config():
    exclude_containers = [arg.lower() for arg in sys.argv[1:]] if len(sys.argv) > 1 else None
    config = generate_nginx_config(exclude_containers)
    if config is not None:
        with open("./default.conf", "w") as f:
            f.write(config)
        print("Archivo default.conf generado correctamente.")
    else:
        print("Error: La configuración de Nginx no se generó correctamente.")

if __name__ == "__main__":
    write_nginx_config()
