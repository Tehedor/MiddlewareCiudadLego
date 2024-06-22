import requests
import sys
from datetime import datetime

Number = sys.argv[1]

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
        "id": f"urn:ngsi-ld:LegoCity:{Number}",
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
        "id": f"urn:ngsi-ld:LegoStreetLight:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoSteetLight"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoTrain:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoTrain"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoRadar:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoRadar"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoRailoadSwitch:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoRailoadSwitch"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoToll:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoToll"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoCrane:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoCrane"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:LegoWheaterStation:{Number}",
        "type": "LegoBuilding",
        "category": {
            "type" :"Property",
            "value": "legoWheaterStation"
        },
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoCity:{Number}"
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
        "id": f"urn:ngsi-ld:PirSensor:{Number}",
        "type": "PirSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "presence" : "LOW",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoStreetLight:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:PhotoresistorSensor:{Number}",
        "type": "PhotoresistorSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "light" : 100,
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoStreetLight:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:PotentiometerSensor:{Number}",
        "type": "PotentiometerSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "velocityControl" : 30,
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoTrain:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:InfraredSensor:{Number}",
        "type": "InfraredSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "presence": "LOW",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoRadar:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:SwitchSensor:{Number}", 
        "type": "SwitchSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "state": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoRailoadSwitch:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:RfidSensor:{Number}",
        "type": "RfidSensor",
        "category": {
            "type": "Property",
            "value": "sensor"
        },
        "uiddcode" : "4FF32FF4",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoToll:{Number}"
        }
        
    },
    {
        "id": f"urn:ngsi-ld:UltrasoundSensor:{Number}",
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
            "object": f"urn:ngsi-ld:LegoCrane:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:TemperatureSensor:{Number}",
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
            "object": f"urn:ngsi-ld:LegoWheaterStation:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:HumiditySensor:{Number}",
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
            "object": f"urn:ngsi-ld:LegoWheaterStation:{Number}"
        }
    }
]

# urn:ngsi-ld:PirSensor:002
# urn:ngsi-ld:PhotoresistorSensor:002
# urn:ngsi-ld:PotentiometerSensor:002
# urn:ngsi-ld:InfraredSensor:002
# urn:ngsi-ld:SwitchSensor:002
# urn:ngsi-ld:RfidSensor:002
# urn:ngsi-ld:UltrasoundSensor:002
# urn:ngsi-ld:TemperatureSensor:002
# urn:ngsi-ld:HumiditySensor:002


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
        "id": f"urn:ngsi-ld:LedDetection:{Number}",
        "type": "LedDetection",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateLed": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoStreetLight:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:Light:{Number}",
        "type": "Light",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateLight": "OFF",
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoStreetLight:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:EngineDC:{Number}",
        "type": "EngineDC",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "velocityEngine": 0,
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoTrain:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:Servmotor:{Number}",
        "type": "Servmotor",
        "category": {
            "type": "Property",
            "value": "actuator"
        },
        "stateMotor": 0,
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoRailoadSwitch:{Number}"
        }
    },
    {
        "id": f"urn:ngsi-ld:Camera:{Number}",
        "type": "Camera",
        "mediaURL": "http://",
        "on": False,
        "startDataTime": datetime.now().isoformat(),
        "controlledAsset": {
            "type": "Relationship",
            "object": f"urn:ngsi-ld:LegoRadar:{Number}"
        }
        # "static_attributes": [
        #     {
        #     "name": "controlledAsset",
        #     "type": "Relationship",
        #     "value": f"urn:ngsi-ld:LegoRadar:{Number}"
        #     }
        # ]
    }
    
]

# urn:ngsi-ld:LedDetection:002
# urn:ngsi-ld:Light:002
# urn:ngsi-ld:EngineDC:002
# urn:ngsi-ld:Servmotor:002
# urn:ngsi-ld:Camera:002


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