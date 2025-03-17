vd_apisApp():
#     return \
# """
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     # ### ### Apis App
#     # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
#     location /api/api-docs/ {
#         # Reescribe las rutas entrantes eliminando el prefijo /api/api-docs/
#         rewrite ^/api/api-docs/(.*)$ /api-docs/$1 break;

#         # Redirige la solicitud al backend
#         proxy_pass http://apis-app:3001/api-docs/;

#         # Encabezados para la solicitud al backend
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;

#         # Reescribir las URLs en el contenido del HTML
#         sub_filter 'href="/' 'href="/api/api-docs/';
#         sub_filter 'src="/' 'src="/api/api-docs/';
#         sub_filter 'action="/' 'action="/api/api-docs/';
#         sub_filter 'url="/' 'url="/api/api-docs/';
#         sub_filter_once off;
#     }
#     location /api/ {
#         # Reescribe las rutas entrantes eliminando el prefijo /subsControlApp/
#         rewrite ^/api/(.*)$ /$1 break;

#         # Redirige la solicitud al backend
#         proxy_pass http://apis-app:3001/;

#         # Encabezados para la solicitud al backend
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
        
        
#         sub_filter "href='/" "href='/api/";
#         sub_filter "href='/api-docs'" " href='/api/api-docs/'";
#         sub_filter 'src="/' 'src="/api/';
#         sub_filter 'action="/' 'action="/api/';
#         sub_filter "url='/" "url='/api/";
#         sub_filter_once off;
    
#     }

#     # location /api/api-docs {
#     #     return 301 /api/api-docs/;
#     # }


#     location /apisApp/ {
#         # Reescribe las rutas entrantes eliminando el prefijo /subsControlApp/
#         # rewrite ^/apisApp/(.*)$ /$1 break;

#         # Redirige la solicitud al backend
#         proxy_pass http://apis-app:3000/apisApp/;

#         # Encabezados para la solicitud al backend
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;

#         # Ajustar las rutas en las respuestas del backend
#         # Asegura que las rutas devueltas sean relativas a /subsControlApp
#         sub_filter 'href="/' 'href="/apisApp/';
#         sub_filter 'src="/' 'src="/apisApp/';
#         sub_filter 'action="/' 'action="/apisApp/';
#         sub_filter 'url="/' 'url="/apisApp/';
#         sub_filter_once off;
#     }
# """










def append_apisApp():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### Apis App
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location = /api/api-docs {
        # Redirección canónica con barra final
        return 301 /api/api-docs/;
    }
    
    location /api/ {
        # Eliminar el prefijo /api/ antes de enviar al backend
        rewrite ^/api/(.*) /$1 break;

        proxy_pass http://apis-app:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Reescribir todas las URLs en las respuestas
        sub_filter_once off;
        sub_filter_types *;  # Aplicar a todos los tipos de contenido
        sub_filter 'href="/' 'href="/api/';
        sub_filter 'src="/' 'src="/api/';
        sub_filter 'action="/' 'action="/api/';
        sub_filter 'url("/' 'url("/api/';
        sub_filter '"/api-docs"' '"/api/api-docs"';  # Específico para Swagger
        
        sub_filter "href='/" "href='/api/";
        sub_filter "src='/" "src='/api/";
        sub_filter "action='/" "action='/api/";
        sub_filter "'/api-docs'" "'/api/api-docs'";  # Específico para Swagger
    }

    location /api/api-docs/ {
        # Mantener el prefijo completo para Swagger
        proxy_pass http://apis-app:3001/api-docs/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        sub_filter_once off;
        sub_filter_types *;
        sub_filter '/api-docs/' '/api/api-docs/';  # Corregir rutas internas
        sub_filter 'Swagger UI' 'API Documentation';  # Ejemplo adicional
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
        sub_filter "href='/" "href='/apisApp/";
        sub_filter "src='/" "src='/apisApp/";
        sub_filter "action='/" "action='/apisApp/";
        sub_filter "url='/" "url='/apisApp/";

        sub_filter 'href="/' 'href="/apisApp/';
        sub_filter 'src="/' 'src="/apisApp/';
        sub_filter 'action="/' 'action="/apisApp/';
        sub_filter 'url="/' 'url="/apisApp/';
        sub_filter_once off;
    }
"""










def append_apisApp():
    return \
"""
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    # ### ### Apis App
    # ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
    location /api/ {
        # Eliminar el prefijo /api/ antes de enviar al backend
        rewrite ^/api/(.*) /$1 break;

        proxy_pass http://apis-app:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Reescribir todas las URLs en las respuestas
        sub_filter_once off;
        sub_filter_types *;  # Aplicar a todos los tipos de contenido
        # sub_filter 'href="/' 'href="/api/';
        # sub_filter 'src="/' 'src="/api/';
        sub_filter 'action="/' 'action="/api/';
        sub_filter 'url("/' 'url("/api/';
        sub_filter '"/api-docs"' '"/api/api-docs"';  # Específico para Swagger
        
        sub_filter "href='/" "href='/api/";
        sub_filter "src='/" "src='/api/";
        sub_filter "action='/" "action='/api/";
        sub_filter "'/api-docs'" "'/api/api-docs'";  # Específico para Swagger
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
        sub_filter "href='/" "href='/apisApp/";
        sub_filter "src='/" "src='/apisApp/";
        sub_filter "action='/" "action='/apisApp/";
        sub_filter "url='/" "url='/apisApp/";

        sub_filter 'href="/' 'href="/apisApp/';
        sub_filter 'src="/' 'src="/apisApp/';
        sub_filter 'action="/' 'action="/apisApp/';
        sub_filter 'url="/' 'url="/apisApp/';
        sub_filter_once off;
    }
"""
