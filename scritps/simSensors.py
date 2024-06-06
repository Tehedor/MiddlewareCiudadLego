import requests
import random
import time


# url = 'http://localhost:1026/ngsi-ld/v1/entityOperations/upsert'
headers = {
    'Content-Type': 'application/json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
}

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### Simulaciones 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 


# PirSensor
presence = "LOW"
def simulatePresence(presence):
    # print(f'p-{presence}')
    rand_num = random.randint(0, 100)

    if presence == "LOW":
        if rand_num < 70:
            presence = "LOW"
        else:   
            presence = "HIGH"
    else:
        if rand_num < 20:
            presence = "HIGH"
        else:
            presence = "LOW"            
    return presence


# PhotoresistorSensor
intensity = 97
def simulateIntensity(intensity):
    rand_num = random.randint(0, 100)
    if rand_num < 10:
        intensity = random.randint(0, 10) if intensity > 50 else random.randint(80, 100)
    return intensity

# PotentiometerSensor
velocityControl = 0
def simulateVelocityControl(velocityControl):
    if velocityControl < 60:
        velocityControl += random.randint(-4, 10)
    elif velocityControl > 100:
        velocityControl += random.randint(-10, 4)
    else:
        velocityControl += random.randint(-6, 6)
    velocityControl = max(0, min(velocityControl, 128))
    return velocityControl

# InfraredSensor
presence2 = "LOW"

# SwitchSensor
state = "OFF"
def simulateState(state):
    rand_num = random.randint(0, 100)
    if rand_num < 3:
        state = "OFF" if state == "ON" else "ON"
    return state

# UltrasoundSensor
distance = 20
def simulateDistance(distance):
    rand_num = random.randint(0, 100)
    if rand_num < 50:
        pass
    elif rand_num < 85:
        if distance > 150:
            distance += random.randint(1, 3)
        else:
            distance += random.randint(1, 10)
    else:
        if distance < 50:
            distance -= random.randint(1, 3)
        else:
            distance -= random.randint(1, 10)
    
    # Ensure distance is within the range 0-200
    distance = max(0, min(distance, 200))
    
    return distance


# TemperatureSensor
temperature = 20
def simulateTemperature(temperature):
    rand_num = random.randint(0, 100)
    if rand_num < 70:
        pass
    elif rand_num < 85:
        if temperature > 30:
            temperature += 1
        else:
            temperature += random.randint(1, 3)
    else:
        if temperature < 10:
            temperature -= 1
        else:
            temperature -= random.randint(1, 3)
            
    return temperature

humidity = 0.3
def simulateHumidity(humidity):
    rand_num = random.randint(0, 100)
    if rand_num < 70:
        pass
    elif rand_num < 85:
        if humidity > 30:
            humidity += 0.01
        else:
            humidity += random.uniform(0.01, 0.03)
    else:
        if humidity < 10:
            humidity -= 0.01
        else:
            humidity -= random.uniform(0.01, 0.03)
            
    return humidity


##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### Sensores 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
while True:
# urn:ngsi-ld:PirSensor:001
# urn:ngsi-ld:PhotoresistorSensor:001
# urn:ngsi-ld:PotentiometerSensor:001
# urn:ngsi-ld:InfraredSensor:001
# urn:ngsi-ld:SwitchSensor:001
# urn:ngsi-ld:RfidSensor:001
# urn:ngsi-ld:UltrasoundSensor:001
# urn:ngsi-ld:TemperatureSensor:001
# urn:ngsi-ld:HumiditySensor:001



    # urn:ngsi-ld:PirSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PirSensor:001/attrs'
    presence = simulatePresence(presence)
    dataPirSensor = {
        "presence" : presence,
    }
    # print(presence)
    requests.patch(url, headers=headers, json=dataPirSensor)

    # urn:ngsi-ld:PhotoresistorSensor:001    
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PhotoresistorSensor:001/attrs'
    intensity = simulateIntensity(intensity)
    dataPhotoresistorSensor = {
        "light" : intensity,
    }
    # print(intensity)
    requests.patch(url, headers=headers, json=dataPhotoresistorSensor)
    

    # # urn:ngsi-ld:PotentiometerSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PotentiometerSensor:001/attrs'
    velocityControl = simulateVelocityControl(velocityControl)
    dataPotentiometerSensor = {
        "velocityControl" : velocityControl,
    } 
    # print(velocityControl)
    requests.patch(url, headers=headers, json=dataPotentiometerSensor)

    # urn:ngsi-ld:InfraredSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:InfraredSensor:001/attrs'
    presence2 = simulatePresence(presence2)
    dataInfraRedSensor = {
        "presence": presence,
    }
    # print(presence2)
    requests.patch(url, headers=headers, json=dataInfraRedSensor)

    # urn:ngsi-ld:SwitchSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:SwitchSensor:001/attrs'
    state = simulateState(state)
    dataSwitchSensor = {
        "state": state,
    }
    # print(state)
    requests.patch(url, headers=headers, json=dataSwitchSensor)
    
    # urn:ngsi-ld:RfidSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:RfidSensor:001/attrs'
    if random.randint(0, 100) < 100:
        uid = hex(random.randint(0, 0xFFFFFFFF))[2:]
        dataRfidSensor = {
            "uiddcode": uid,
        }
        # print(uid)
        requests.patch(url, headers=headers, json=dataRfidSensor)
    
    # urn:ngsi-ld:UltrasoundSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:UltrasoundSensor:001/attrs'
    distance = simulateDistance(distance)
    dataUltrasoundSensor = {
        "distance" : {
            "type": "Property",
            "value": distance,
            "unitCode": "CMT"
        },
    }
    # print(distance)
    requests.patch(url, headers=headers, json=dataUltrasoundSensor)
    
    # TemperatureSensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:TemperatureSensor:001/attrs'
    temperature=simulateTemperature(temperature)
    dataTemperatureSensor = {
        "temperature" : {
            "type": "Property",
            "value": temperature,
            "unitCode": "CEL"
        }
    }
    # print(temperature)
    requests.patch(url, headers=headers, json=dataTemperatureSensor)
    
    # urn:ngsi-ld:HumiditySensor:001
    url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:HumiditySensor:001/attrs'
    humidity = simulateHumidity(humidity)
    dataHumiditySensor = {
        "humidity" : {
            "type": "Property",
            "value": humidity,
            "unitCode": "P1"
        }
    }
    # print(humidity)
    requests.patch(url, headers=headers, json=dataHumiditySensor)
    

    time.sleep(0.2)

##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 

# while True:
# # urn:ngsi-ld:PirSensor:001
# # urn:ngsi-ld:PhotoresistorSensor:001
# # urn:ngsi-ld:PotentiometerSensor:001
# # urn:ngsi-ld:InfraredSensor:001
# # urn:ngsi-ld:SwitchSensor:001
# # urn:ngsi-ld:RfidSensor:001
# # urn:ngsi-ld:UltrasoundSensor:001
# # urn:ngsi-ld:TemperatureSensor:001
# # urn:ngsi-ld:HumiditySensor:001



#     # urn:ngsi-ld:PirSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PirSensor:001/attrs'
#     presence = simulatePresence(presence)
#     dataPirSensor = {
#         "presence" : "pruebas",
#     }
#     # print(presence)
#     requests.patch(url, headers=headers, json=dataPirSensor)

#     # # urn:ngsi-ld:PhotoresistorSensor:001    
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PhotoresistorSensor:001/attrs'
#     # intensity = simulateIntensity(intensity)
#     dataPhotoresistorSensor = {
#         "light" : "pruebas",
#     }
#     # print(intensity)
#     requests.patch(url, headers=headers, json=dataPhotoresistorSensor)
    

#     # # # urn:ngsi-ld:PotentiometerSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PotentiometerSensor:001/attrs'
#     velocityControl = simulateVelocityControl(velocityControl)
#     dataPotentiometerSensor = {
#         "velocityControl" : 1,
#     } 
#     # print(velocityControl)
#     requests.patch(url, headers=headers, json=dataPotentiometerSensor)

#     # # urn:ngsi-ld:InfraredSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:InfraredSensor:001/attrs'
#     presence2 = simulatePresence(presence2)
#     dataInfraRedSensor = {
#         "presence": "pruebas",
#     }
#     # print(presence2)
#     requests.patch(url, headers=headers, json=dataInfraRedSensor)

#     # # urn:ngsi-ld:SwitchSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:SwitchSensor:001/attrs'
#     state = simulateState(state)
#     dataSwitchSensor = {
#         "state": "pruebas",
#     }
#     # print(state)
#     requests.patch(url, headers=headers, json=dataSwitchSensor)
    
#     # # urn:ngsi-ld:RfidSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:RfidSensor:001/attrs'
#     if random.randint(0, 100) < 100:
#         uid = hex(random.randint(0, 0xFFFFFFFF))[2:]
#         print(uid)
#         dataRfidSensor = {
#             "uiddcode": "5555555",
#         }
#     # print(uid)
#         requests.patch(url, headers=headers, json=dataRfidSensor)
    
#     # # urn:ngsi-ld:UltrasoundSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:UltrasoundSensor:001/attrs'
#     distance = simulateDistance(distance)
#     dataUltrasoundSensor = {
#         "distance" : {
#             "type": "Property",
#             "value": 1,
#             "unitCode": "CMT"
#         },
#     }
#     # print(distance)
#     requests.patch(url, headers=headers, json=dataUltrasoundSensor)
    
#     # # TemperatureSensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:TemperatureSensor:001/attrs'
#     temperature=simulateTemperature(temperature)
#     dataTemperatureSensor = {
#         "temperature" : {
#             "type": "Property",
#             "value": 1,
#             "unitCode": "CEL"
#         }
#     }
#     # print(temperature)
#     requests.patch(url, headers=headers, json=dataTemperatureSensor)
    
#     # # urn:ngsi-ld:HumiditySensor:001
#     url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:HumiditySensor:001/attrs'
#     humidity = simulateHumidity(humidity)
#     dataHumiditySensor = {
#         "humidity" : {
#             "type": "Property",
#             "value": 1,
#             "unitCode": "P1"
#         }
#     }
#     # print(humidity)
#     requests.patch(url, headers=headers, json=dataHumiditySensor)
    

#     time.sleep(6)
    
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### Actuadores
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### 
# urn:ngsi-ld:LedDetection:001
# urn:ngsi-ld:Light:001
# urn:ngsi-ld:EngineDC:001
# urn:ngsi-ld:Servmotor:001
# urn:ngsi-ld:Camera:001
