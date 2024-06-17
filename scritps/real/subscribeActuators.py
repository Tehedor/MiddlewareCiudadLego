import requests

uri_pirSensor = 'http://ip:3001/pirSensor'
uri_photoresistorSensor = 'http://ip:3001/photoresistorSensor'
uri_potentiometerSensor = 'http://ip:3001/potentiometerSensor'
uri_infraredSensor = 'http://ip:3001/infraredSensor'
uri_switchSensor = 'http://ip:3001/switchSensor'
uri_rfidSensor = 'http://ip:3001/rfidSensor'
uri_ultrasoundSensor = 'http://ip:3001/ultrasoundSensor'
uri_temperatureSensor = 'http://ip:3001/temperatureSensor'
uri_humiditySensor = 'http://ip:3001/humiditySensor'

####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Sensor
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
PirSensorAttr = ["type","category", "presence", "controlledAsset"]
PirSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": "urn:ngsi-ld:PirSensor:001","type": "PirSensor"}],
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

PhotoresistorSensorAttr = ["type", "category", "light", "controlledAsset"]
PhotoresistorSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id": "urn:ngsi-ld:PhotoresistorSensor:001","type": "PhotoresistorSensor"}],
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
    "entities": [{"id": "urn:ngsi-ld:PotentiometerSensor:001","type": "PotentiometerSensor"}],
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
    "entities": [{"id":"urn:ngsi-ld:InfraredSensor:001","type": "InfraredSensor"}],
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
    "entities": [{"id":"urn:ngsi-ld:SwitchSensor:001","type": "SwitchSensor"}],
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


RfidSensorAttr = ["type", "category", "uiddcode", "controlledAsset"]
RfidSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":"urn:ngsi-ld:RfidSensor:001","type": "RfidSensor"}],
    "watchedAttributes": ["uiddcode"],
    "notification": {
        "attributes": RfidSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_rfidSensor,
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

UltrasoundSensorAttr = ["type", "category", "distance", "controlledAsset"]
UltrasoundSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":"urn:ngsi-ld:UltrasoundSensor:001","type": "UltrasoundSensor"}],
    "watchedAttributes": ["distance"],
    "notification": {
        "attributes": UltrasoundSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_ultrasoundSensor,
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

TemperatureSensorAttr = ["type", "category", "temperature", "controlledAsset"]
TemperatureSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":"urn:ngsi-ld:TemperatureSensor:001","type": "TemperatureSensor"}],
    "watchedAttributes": ["temperature"],
    "notification": {
        "attributes": TemperatureSensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_temperatureSensor,
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

HumiditySensorAttr = ["type", "category", "humidity", "controlledAsset"]
HumiditySensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"id":"urn:ngsi-ld:HumiditySensor:001","type": "HumiditySensor"}],
    "watchedAttributes": ["humidity"],
    "notification": {
        "attributes": HumiditySensorAttr,
        "format": "normalized",
        "endpoint": {
            "uri": uri_humiditySensor,
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


# Sensors
sensors = [PirSensor, PhotoresistorSensor, PotentiometerSensor, InfraredSensor, SwitchSensor, RfidSensor, UltrasoundSensor, TemperatureSensor, HumiditySensor]




####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Peticiones Http
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/'

headers = {
    'Content-Type': 'application/ld+json',
}
    # 'NGSILD-Tenant': 'actuators_subscription'

# headers = {
#     'Content-Type': 'application/ld+json',
#     'NGSILD-Tenant': 'openiot'
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

