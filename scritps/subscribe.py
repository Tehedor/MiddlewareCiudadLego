import requests

draco_uri = "http://localhost:5050/v2/notify"

####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Buildings
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
LegoCityAttr = "type, category, address"
LegoCity = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "Building"}],
    "watchedAttributes": ["address"],
    "notification": {
        "attributes": [LegoCityAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoStreetLightAttr = "type, category, controlledAsset"
LegoStreetLight = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoStreetLight"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoStreetLightAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoTrainAttr = "type, category, controlledAsset"
LegoTrain = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoTrain"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoTrainAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoRadarAttr = "type, category, controlledAsset"
LegoRadar = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoRadar"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoRadarAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoRailoadSwitchAttr = "type, category, controlledAsset"
LegoRailoadSwitch = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoRailoadSwitch"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoRailoadSwitchAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoTollAttr = "type, category, controlledAsset"
LegoToll = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoToll"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoTollAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoCraneAttr = "type, category, controlledAsset"
LegoCrane = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoCrane"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoCraneAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LegoWheaterStationAttr = "type, category, controlledAsset"
LegoWheaterStation = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LegoWheaterStation"}],
    "watchedAttributes": ["controlledAsset"],
    "notification": {
        "attributes": [LegoWheaterStationAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

buildings = [LegoCity, LegoStreetLight, LegoTrain, LegoRadar, LegoRailoadSwitch, LegoToll, LegoCrane, LegoWheaterStation]
    


####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Sensor
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######


PirSensorAttr = "type, category, presence, controlledAsset"
PirSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": [PirSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

PhotoresistorSensorAttr = "type, category, light, controlledAsset"
PhotoresistorSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "PhotoresistorSensor"}],
    "watchedAttributes": ["light"],
    "notification": {
        "attributes": [PhotoresistorSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

PotentiometerSensorAttr = "type, category, velocityControl, controlledAsset"
PotentiometerSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "PotentiometerSensor"}],
    "watchedAttributes": ["velocityControl"],
    "notification": {
        "attributes": [PotentiometerSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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
    

InfraredSensorAttr = "type, category, presence, controlledAsset"
InfraredSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "InfraredSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": [InfraredSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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


SwitchSensorAttr = "type, category, state, controlledAsset"
SwitchSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "SwitchSensor"}],
    "watchedAttributes": ["state"],
    "notification": {
        "attributes": [SwitchSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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


RfidSensorAttr = "type, category, uiddcode, controlledAsset"
RfidSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "RfidSensor"}],
    "watchedAttributes": ["uiddcode"],
    "notification": {
        "attributes": [RfidSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

UltrasoundSensorAttr = "type, category, distance, controlledAsset"
UltrasoundSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "UltrasoundSensor"}],
    "watchedAttributes": ["distance"],
    "notification": {
        "attributes": [UltrasoundSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

TemperatureSensorAttr = "type, category, temperature, controlledAsset"
TemperatureSensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "TemperatureSensor"}],
    "watchedAttributes": ["temperature"],
    "notification": {
        "attributes": [TemperatureSensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

HumiditySensorAttr = "type, category, humidity, controlledAsset"
HumiditySensor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "HumiditySensor"}],
    "watchedAttributes": ["humidity"],
    "notification": {
        "attributes": [HumiditySensorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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
####### ####### ####### ####### Actuators
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

LedDetectionAttr = "type, category, stateLed, controlledAsset"
LedDetection = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "LedDetection"}],
    "watchedAttributes": ["stateLed"],
    "notification": {
        "attributes": [LedDetectionAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

LightAttr = "type, category, stateLight, controlledAsset"
Light = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "Light"}],
    "watchedAttributes": ["stateLight"],
    "notification": {
        "attributes": [LightAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

EngineDCAttr = "type, category, velocityEngine, controlledAsset"
EngineDC = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "EngineDC"}],
    "watchedAttributes": ["velocityEngine"],
    "notification": {
        "attributes": [EngineDCAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

ServmotorAttr = "type, category, stateMotor, controlledAsset"
Servmotor = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "Servmotor"}],
    "watchedAttributes": ["stateMotor"],
    "notification": {
        "attributes": [ServmotorAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

CameraAttr = "type, mediaURL, on, startDataTime, controlledAsset"
Camera = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "Camera"}],
    "watchedAttributes": ["mediaURL","on","startDataTime"],
    "notification": {
        "attributes": [CameraAttr],
        "format": "normalized",
        "endpoint": {
            "uri": draco_uri,
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

# Actuators
actuators = [LedDetection, Light, EngineDC, Servmotor, Camera]


####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Peticiones Http
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######

url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/'

headers = {
    'Content-Type': 'application/ld+json',
    'NGSILD-Tenant': 'openiot'
}

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

# Actuadores
print("\n\033[33mSuscripcion Actuadores\033[0m")                                          
for actuator in actuators:
    response = requests.post(url, headers=headers, json=actuator)
    if(response.status_code == 201):
        # print(f'Suscripcion {actuator}')
        print(f'Suscripcion {actuator["entities"][0]["type"]}')
    else:
        print("Error")  


# Buildings
print("\n\033[34mSuscripcion Buildings\033[0m")
for building in buildings:
    response = requests.post(url, headers=headers, json=building)
    if(response.status_code == 201):
        # print(f'Suscripcion {building}')
        print(f'Suscripcion {building["entities"][0]["type"]}')
    else:
        print("Error")
    # print(response.status_code)
    # print(response.text)                              

# response = requests.post(url, headers=headers, json=PirSensor)
# print("Suscripcion PirSensor")
# print(response.status_code)
# print(response.text)