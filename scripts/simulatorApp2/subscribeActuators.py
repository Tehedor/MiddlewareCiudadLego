import requests
import subprocess
import sys

Number = sys.argv[1]

host = subprocess.check_output('hostname -I', shell=True).decode('utf-8').split(' ')[0]

uri_pirSensor = f"http://{host}:3001/ledDetectionActuator"
uri_pirSensor2 = f"http://{host}:3001/lightActuator"
uri_photoresistorSensor = f'http://{host}:3001/lightActuator'
uri_potentiometerSensor = f'http://{host}:3001/engineDCActuator'
uri_switchSensor = f'http://{host}:3001/servmotorActuator'
uri_infraredSensor = f'http://{host}:3001/cameraActuator'

# uri_rfidSensor = f'http://{host}:3001/rfidSensor'
# uri_ultrasoundSensor = f'http://{host}:3001/ultrasoundSensor'
# uri_temperatureSensor = f'http://{host}:3001/temperatureSensor'
# uri_humiditySensor = f'http://{host}:3001/humiditySensor'

# urn:ngsi-ld:LegoCity:002
# urn:ngsi-ld:LegoStreetLight:002
# urn:ngsi-ld:LegoTrain:002
# urn:ngsi-ld:LegoRadar:002
# urn:ngsi-ld:LegoRailoadSwitch:002
# urn:ngsi-ld:LegoToll:002
# urn:ngsi-ld:LegoCrane:002
# urn:ngsi-ld:LegoWheaterStation:002

# urn:ngsi-ld:PirSensor:002
# urn:ngsi-ld:PhotoresistorSensor:002
# urn:ngsi-ld:PotentiometerSensor:002
# urn:ngsi-ld:InfraredSensor:002
# urn:ngsi-ld:SwitchSensor:002
# urn:ngsi-ld:RfidSensor:002
# urn:ngsi-ld:UltrasoundSensor:002
# urn:ngsi-ld:TemperatureSensor:002
# urn:ngsi-ld:HumiditySensor:002

# urn:ngsi-ld:LedDetection:002
# urn:ngsi-ld:Light:002
# urn:ngsi-ld:EngineDC:002
# urn:ngsi-ld:Servmotor:002
# urn:ngsi-ld:Camera:002



####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Sensor
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
PirSensorAttr = ["type","category", "presence", "controlledAsset"]
PirSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": f"urn:ngsi-ld:PirSensor:{Number}","type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": PirSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_pirSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}

PirSensor2 = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": f"urn:ngsi-ld:PirSensor:{Number}","type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": PirSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_pirSensor2,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}

PhotoresistorSensorAttr = ["type", "category", "light", "controlledAsset"]
PhotoresistorSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": f"urn:ngsi-ld:PhotoresistorSensor:{Number}","type": "PhotoresistorSensor"}],
    "watchedAttributes": ["light"],
    "notification": {
        "attributes": PhotoresistorSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_photoresistorSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}

PotentiometerSensorAttr = ["type", "category", "velocityControl", "controlledAsset"]
PotentiometerSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": f"urn:ngsi-ld:PotentiometerSensor:{Number}","type": "PotentiometerSensor"}],
    "watchedAttributes": ["velocityControl"],
    "notification": {
        "attributes": PotentiometerSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_potentiometerSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}
    

InfraredSensorAttr = ["type", "category", "presence", "controlledAsset"]
InfraredSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":f"urn:ngsi-ld:InfraredSensor:{Number}","type": "InfraredSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": InfraredSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_infraredSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}


SwitchSensorAttr = ["type", "category", "state", "controlledAsset"]
SwitchSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":f"urn:ngsi-ld:SwitchSensor:{Number}","type": "SwitchSensor"}],
    "watchedAttributes": ["state"],
    "notification": {
        "attributes": SwitchSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_switchSensor,
            "accept": "application/json",
            "receiverInfo": [
                {
                    "key": "fiware-service",
                    "value": "openiot"
                }
            ]
        }
    },
    "@context": "http://context/datamodels.context-ngsi.jsonld"
}


# RfidSensorAttr = ["type", "category", "uiddcode", "controlledAsset"]
# RfidSensor = {
#     "description": "Notify me of all feedstock changes",
#     "type": "Subscription",
#     "entities": [{"id":"urn:ngsi-ld:RfidSensor:002","type": "RfidSensor"}],
#     "watchedAttributes": ["uiddcode"],
#     "notification": {
#         "attributes": RfidSensorAttr,
#         "format": "normalized",
#         "endpoint": {
#             "uri": uri_rfidSensor,
#             "accept": "application/json",
#             "receiverInfo": [
#                 {
#                     "key": "fiware-service",
#                     "value": "openiot"
#                 }
#             ]
#         }
#     },
#     "@context": "http://context/datamodels.context-ngsi.jsonld"
# }

# UltrasoundSensorAttr = ["type", "category", "distance", "controlledAsset"]
# UltrasoundSensor = {
#     "description": "Notify me of all feedstock changes",
#     "type": "Subscription",
#     "entities": [{"id":"urn:ngsi-ld:UltrasoundSensor:002","type": "UltrasoundSensor"}],
#     "watchedAttributes": ["distance"],
#     "notification": {
#         "attributes": UltrasoundSensorAttr,
#         "format": "normalized",
#         "endpoint": {
#             "uri": uri_ultrasoundSensor,
#             "accept": "application/json",
#             "receiverInfo": [
#                 {
#                     "key": "fiware-service",
#                     "value": "openiot"
#                 }
#             ]
#         }
#     },
#     "@context": "http://context/datamodels.context-ngsi.jsonld"
# }

# TemperatureSensorAttr = ["type", "category", "temperature", "controlledAsset"]
# TemperatureSensor = {
#     "description": "Notify me of all feedstock changes",
#     "type": "Subscription",
#     "entities": [{"id":"urn:ngsi-ld:TemperatureSensor:002","type": "TemperatureSensor"}],
#     "watchedAttributes": ["temperature"],
#     "notification": {
#         "attributes": TemperatureSensorAttr,
#         "format": "normalized",
#         "endpoint": {
#             "uri": uri_temperatureSensor,
#             "accept": "application/json",
#             "receiverInfo": [
#                 {
#                     "key": "fiware-service",
#                     "value": "openiot"
#                 }
#             ]
#         }
#     },
#     "@context": "http://context/datamodels.context-ngsi.jsonld"
# }

# HumiditySensorAttr = ["type", "category", "humidity", "controlledAsset"]
# HumiditySensor = {
#     "description": "Notify me of all feedstock changes",
#     "type": "Subscription",
#     "entities": [{"id":"urn:ngsi-ld:HumiditySensor:002","type": "HumiditySensor"}],
#     "watchedAttributes": ["humidity"],
#     "notification": {
#         "attributes": HumiditySensorAttr,
#         "format": "normalized",
#         "endpoint": {
#             "uri": uri_humiditySensor,
#             "accept": "application/json",
#             "receiverInfo": [
#                 {
#                     "key": "fiware-service",
#                     "value": "openiot"
#                 }
#             ]
#         }
#     },
#     "@context": "http://context/datamodels.context-ngsi.jsonld"
# }


# Sensors
# sensors = [PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor]
sensors = [PirSensor,PhotoresistorSensor, PirSensor2 , PotentiometerSensor, InfraredSensor, SwitchSensor]




####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Peticiones Http
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/'

headers = {
    'Content-Type': 'application/ld+json'
}
    # 'NGSILD-Tenant': 'openiot'
    # 'NGSILD-Tenant': 'actuators_subscription'

# headers = {
#     'Content-Type': 'application/ld+json',
# }

# Draco notification
# http://localhost:5050/v2/notify


# Sensores
print("\n\033[32mSuscripcion Sensores\033[0m")
for sensor in sensors:
    response = requests.post(url, headers=headers, json=sensor)
    if(response.status_code == 201):
        # print(f'Suscripcion {sensor.entities[0]["type"]}')
        print(f'Suscripcion {sensor["entities"][0]["type"]}')
    else:
        print("Error")

