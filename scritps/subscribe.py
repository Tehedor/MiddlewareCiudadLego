# basura
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
# ```console
# curl -L -X POST 'http://localhost:1026/ngsi-ld/v1/subscriptions/' \
# -H 'Content-Type: application/ld+json' \
# -H 'NGSILD-Tenant: openiot' \
# --data-raw '{
#   "description": "Notify me of all feedstock changes",
#   "type": "Subscription",
#   "entities": [{"type": "FillingLevelSensor"}],
#   "watchedAttributes": ["filling"],
#   "notification": {
#     "attributes": ["filling", "location"],
#     "format": "normalized",
#     "endpoint": {
#       "uri": "http://quantumleap:8668/v2/notify",
#       "accept": "application/json",
#       "receiverInfo": [
#         {
#           "key": "fiware-service",
#           "value": "openiot"
#         }
#       ]
#     }
#   },
#    "@context": "http://context/ngsi-context.jsonld"
# }'
# ```

import requests

url = 'http://localhost:1026/ngsi-ld/v1/subscriptions/'

headers = {
    'Content-Type': 'application/ld+json',
    'NGSILD-Tenant': 'openiot'
}

# Draco notification
# http://localhost:5050/v2/notify


####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
####### ####### ####### ####### Sensor
####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### ####### #######
# "id": "urn:ngsi-ld:PirSensor:001",
#         "type": "PirSensor",
#         "category": {
#             "type": "Property",
#             "value": "sensor"
#         },
#         "presence" : "LOW",
#         "controlledAsset": {
#             "type": "Relationship",
#             "object": "urn:ngsi-ld:LegoStreetLight:001"
#         }
PirSensor = "type, category, presence, controlledAsset"

PirSensorSub = {
    "description": "Notify me of all feedstock changes",
    "type": "Subscription",
    "entities": [{"type": "PirSensor"}],
    "watchedAttributes": ["presence"],
    "notification": {
        "attributes": [PIR],
        "format": "normalized",
        "endpoint": {
            "uri": "http://localhost:5050/v2/notify",
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


response = requests.post(url, headers=headers, json=PirSensor)
print("Suscripcion PirSensor")
print(response.status_code)
print(response.text)