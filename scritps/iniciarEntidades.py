import requests

# url = 'http://localhost:1026/ngsi-ld/v1/entities/'
url = 'http://localhost:1026/ngsi-ld/v1/entityOperations/upsert'
headers = {
    'Content-Type': 'application/json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
}


####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Room buildings 
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
dataLegoCity = [
    {
        "id": "urn:ngsi-ld:LegoCity:001",
        "type": "Building",
        "category": {
            "type" :"Property",
            "value": "construction"
        },
        "address": {
            "type": "Property",
            "value": {
                "addressLocality": "Madrid - Aravaca",
                "postalCode": "28040",
                "streetAddress": "Av. Complutense, 30",
            }
        },
    }
]

dataLegoBuilding = [
    {
        "id": "urn:ngsi-ld:LegoStreetLight:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoSteetLight"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
    },
    {
        "id": "urn:ngsi-ld:LegoTrain:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoTrain"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
    },
    {
        "id": "urn:ngsi-ld:LegoRadar:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoRadar"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
    },
    {
        "id": "urn:ngsi-ld:LegoRailoadSwitch:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoRailoadSwitch"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
        
    },
    {
        "id": "urn:ngsi-ld:LegoToll:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoToll"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
    },
    {
        "id": "urn:ngsi-ld:LegoCrane:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoCrane"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }
    },
    {
        "id": "urn:ngsi-ld:LegoWheaterStation:001",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoWheaterStation"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCity:001"
        }   
    }
]


####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Sensor
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
    # pirSensor
    # photoresistorSensor
    # potentiometerSensor
    # infraredSensor
    # switchSensor
    # rfidSensor
    # ultrasoundSensor
    # temperatureSensor
    # humiditySensor
dataSensors = [
    {
        "id": "urn:ngsi-ld:PirSensor:001",
        "type": "PirSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "presence" : "LOW",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoStreetLight:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoStreetLight:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:PhotoresistorSensor:001",
        "type": "PhotoresistorSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "light" : "100",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoStreetLight:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoStreetLight:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:PotentiometerSensor:001",
        "type": "PotentiometerSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "velocityControl" : 30,
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoTrain:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoTrain:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:InfraredSensor:001",
        "type": "InfraredSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "presence": "LOW",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoRadar:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoRadar:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:SwitchSensor:001", 
        "type": "SwitchSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "state": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoRailoadSwitch:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoRailoadSwitch:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:RfidSensor:001",
        "type": "RfidSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "uiddcode" : "4FF32FF4",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoToll:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoToll:001"
        #     }
        # ]
        
    },
    {
        "id": "urn:ngsi-ld:UltrasoundSensor:001",
        "type": "UltrasoundSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "distance" : {
            "type": "Property",
            "value": 20,
            "unitCode": "CMT"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoCrane:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoCrane:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:TemperatureSensor:001",
        "type": "TemperatureSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "temperature" : {
            "type": "Property",
            "value": 20,
            "unitCode": "CEL"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoWheaterStation:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoWheaterStation:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:HumiditySensor:001",
        "type": "HumiditySensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "humidity" : {
            "type": "Property",
            "value": 0.5,
            "unitCode": "P1"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoWheaterStation:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoWheaterStation:001"
        #     }
        # ]
    }
]

####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Actuators
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
# LedDetection -> stateLed on/off
# Light -> stateLight on/off
# EngineDC -> velocityEngine
# Servmotor -> stateMotor 1/2
# Camera -> 

dataActuators = [
    {
        "id": "urn:ngsi-ld:LedDetection:001",
        "type": "LedDetection",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateLed": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoStreetLight:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoStreetLight:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:Light:001",
        "type": "Light",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateLight": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoStreetLight:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoStreetLight:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:EngineDC:001",
        "type": "EngineDC",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "velocityEngine": 0,
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoTrain:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoTrain:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:Servmotor:001",
        "type": "Servmotor",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateMotor": 1,
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoRailoadSwitch:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoRailoadSwitch:001"
        #     }
        # ]
    },
    {
        "id": "urn:ngsi-ld:Camera:001",
        "type": "Camera",
        "mediaURL": "http://",
        "on": "false",
        "startDataTime": "2021-06-01T00:00:00Z",
        "controlledAsset": {
            "type": "Relationship",
            "object": "urn:ngsi-ld:LegoRadar:001"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": "urn:ngsi-ld:LegoRadar:001"
        #     }
        # ]
    }
    
]

response = requests.post(url, headers=headers, json=dataSensors)
print("ini Sensors")
print(response.status_code)
print(response.text)

response = requests.post(url, headers=headers, json=dataActuators)
print("ini Actuators")
print(response.status_code)
print(response.text)

response = requests.post(url, headers=headers, json=dataLegoBuilding)
print("ini Buildings")
print(response.status_code)
print(response.text)

response = requests.post(url, headers=headers, json=dataLegoCity)
print("ini General")
print(response.status_code)
print(response.text)