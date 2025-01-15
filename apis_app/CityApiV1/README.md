# CityApi

## Tipos de apis

### Apis conexión mongo draco

#### Actuators

##### **## Api Actuator**
GET /api/actuators/{{ngsiID}}

- Te muestra caracteristicas de un **"Actuador"** 

#### Senensors

##### **## Api Sensor**
GET /api/sensors/{{ngsiID}}

- Te muestra todas las caracteristicas de un **"Sensor"**


---
### Apis conexión con orio "contex broker"

#### Buildings

##### **## Apis general Buildings**: 
GET /api/buidings

- Te muestra todas la **"Buildings"**

##### **## Apis Bilding**: 
GET /api/buildings/{{ngsiID}}

- Te muestra caracteristicas de un **"Buildings"** mas todos los los componetes relacionados a estos

---
#### Actuators & Camera

##### **## Api Actuat General**
GET /api/actuators

- Te muestra todos los **"Actuators"**


##### **## Api Actuatro**
GET /api/current/actuators/{{ngsiID}}

- Te muestra un **"Actuador"** en tiempo real 

###



--- 
#### Sensores

##### **## Api Sensors General**
GET /api/sensors

- Te muestra todos los **"Sensors"**

##### **## Api Sensor Real Time**
GET /api/current/sensors/{{ngsiID}}

- Te muestra un **"Sensor"** en tiempo real


!!! tip ngsiID
    ngsiID: urn:ngsi-ld:HumiditySensor:001