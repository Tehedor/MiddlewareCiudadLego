import sys
import docker

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

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
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
        proxy_pass http://subsControlApp:4040/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Remove /service from the forwarded request
        rewrite ^/subsControlApp/(.*)$ /$1 break;
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
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
"""


# Buscar contenedores activos
def get_active_containers():
    client = docker.from_env()
    containers = client.containers.list()
        
    active_services = []
    
    for container in containers:
        container_name = container.name.lower()
        if "fiware-orion" == container_name:
            active_services.append("fiware-orion")
        if "draco" == container_name:
            active_services.append("draco")
        if "simulator-app" == container_name:
            active_services.append("simulator-app")
        if  "subs-control-app" == container_name:
            active_services.append("subs-control-app")
    
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
    if 'draco' in active_services:
        config += append_draco()
    if 'simulator-app' in active_services:
        config += append_simulator()
    if 'subs-control-app' in active_services:
        config += append_subscontrolapp()
    
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
