import requests
import random
import time

start_time = time.time()

# url = 'http://localhost:1026/ngsi-ld/v1/entityOperations/upsert'
headers = {
    'Content-Type': 'application/json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
}



# // Sensors
# // urn:ngsi-ld:PirSensor:002
# // urn:ngsi-ld:PhotoresistorSensor:002
# // urn:ngsi-ld:PotentiometerSensor:002
# // urn:ngsi-ld:InfraredSensor:002
# // urn:ngsi-ld:SwitchSensor:002
# // urn:ngsi-ld:RfidSensor:002
# // urn:ngsi-ld:UltrasoundSensor:002
# // urn:ngsi-ld:TemperatureSensor:002
# // urn:ngsi-ld:HumiditySensor:002
# urn:ngsi-ld:PirSensor:001

# url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PirSensor:002/attrs'
# # presence = simulatePresence(presence)
# dataPirSensor = {
#     "presence" : "HIGH",
# }
# # print(presence)
# requests.patch(url, headers=headers, json=dataPirSensor)


# # urn:ngsi-ld:PotentiometerSensor:001
# url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PotentiometerSensor:002/attrs'
# # velocityControl = simulateVelocityControl(velocityControl)
# dataPotentiometerSensor = {
#     "velocityControl" : 128,
# } 
# # print(velocityControl)
# requests.patch(url, headers=headers, json=dataPotentiometerSensor)


# url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PhotoresistorSensor:002/attrs'
# # intensity = simulateIntensity(intensity)
# dataPhotoresistorSensor = {
#     "light" : 99,
# }
#     # print(intensity)
# requests.patch(url, headers=headers, json=dataPhotoresistorSensor)
    



# http://localhost:1026/ngsi-ld/v1/subscriptions/






    # # # urn:ngsi-ld:PotentiometerSensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:PotentiometerSensor:001/attrs'
    # velocityControl = simulateVelocityControl(velocityControl)
    # dataPotentiometerSensor = {
    #     "velocityControl" : velocityControl,
    # } 
    # # print(velocityControl)
    # requests.patch(url, headers=headers, json=dataPotentiometerSensor)

    # # urn:ngsi-ld:InfraredSensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:InfraredSensor:001/attrs'
    # presence2 = simulatePresence(presence2)
    # dataInfraRedSensor = {
    #     "presence": presence,
    # }
    # # print(presence2)
    # requests.patch(url, headers=headers, json=dataInfraRedSensor)

# urn:ngsi-ld:SwitchSensor:001
url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:SwitchSensor:002/attrs'
state = "ON"

dataSwitchSensor = {
    "state": state,
}
requests.patch(url, headers=headers, json=dataSwitchSensor)

    # # urn:ngsi-ld:RfidSensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:RfidSensor:001/attrs'
    # if random.randint(0, 100) < 100:
    #     uid = hex(random.randint(0, 0xFFFFFFFF))[2:]
    #     dataRfidSensor = {
    #         "uiddcode": uid,
    #     }
    #     # print(uid)
    #     requests.patch(url, headers=headers, json=dataRfidSensor)
    
    # # urn:ngsi-ld:UltrasoundSensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:UltrasoundSensor:001/attrs'
    # distance = simulateDistance(distance)
    # dataUltrasoundSensor = {
    #     "distance" : {
    #         "type": "Property",PirSen
    #         "value": distance,
    #         "unitCode": "CMT"
    #     },
    # }
    # # print(distance)
    # requests.patch(url, headers=headers, json=dataUltrasoundSensor)
    
    # # TemperatureSensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:TemperatureSensor:001/attrs'
    # temperature=simulateTemperature(temperature)
    # dataTemperatureSensor = {
    #     "temperature" : {
    #         "type": "Property",
    #         "value": temperature,
    #         "unitCode": "CEL"
    #     }
    # }
    # # print(temperature)
    # requests.patch(url, headers=headers, json=dataTemperatureSensor)
    
    # # urn:ngsi-ld:HumiditySensor:001
    # url = 'http://localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:HumiditySensor:001/attrs'
    # dataHumiditySensor = {
    #     "humidity" : {
    #         "type": "Property",
    #         "value": "3.14",
    #         "unitCode": "P1"
    #     }
    # }
    # # print(humidity)
    # humidity = simulateHumidity(humidity)
    # requests.patch(url, headers=headers, json=dataHumiditySensor)    
