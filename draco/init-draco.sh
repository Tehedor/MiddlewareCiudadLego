#!/bin/sh
set -e

# Comprobar si jq está instalado
if ! command -v jq &> /dev/null; then
  echo -e "\n\e[31m###########################################################################"
  echo -e "\e[31m###########################################################################"
  echo -e "\e[31mERROR: 'jq' no está instalado. Por favor, instala jq antes de continuar.\e[0m"
  echo "En Ubuntu/Debian: sudo apt install jq"
  echo "En MacOS: brew install jq"
  echo -e "\e[31m###########################################################################"
  echo -e "\e[31m###########################################################################\n"
  exit 1
fi

# NIFI_HOST=http://localhost:9090

# Esperar a que NiFi esté listo
echo "Esperando a que NiFi esté disponible..."
until curl -s "$NIFI_HOST/nifi" > /dev/null; do
  sleep 1
  echo -n "."
done

echo "NiFi disponible. Subiendo plantilla..."
curl -X POST "$NIFI_HOST/nifi-api/process-groups/root/templates/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "template=@./draco-ld-template/NGSI-LD_to_Mongo-Configured.xml" \

echo "Instanciando plantilla..."
TEMPLATE_ID=$(curl -s "$NIFI_HOST/nifi-api/flow/templates" | jq -r '.templates[0].id')
curl -X POST "$NIFI_HOST/nifi-api/process-groups/root/template-instance" \
  -H "Content-Type: application/json" \
  -d '{"templateId":"'"$TEMPLATE_ID"'","originX":0.0,"originY":0.0,"disconnectedNodeAcknowledged":false}'

echo "Arrancando flujo..."
GROUP_ID=$(curl -s "$NIFI_HOST/nifi-api/flow/process-groups/root/status" | jq -r '.processGroupStatus.id')
curl -X PUT "$NIFI_HOST/nifi-api/flow/process-groups/$GROUP_ID" \
  -H "Content-Type: application/json" \
  -d '{"id":"'"$GROUP_ID"'","state":"RUNNING"}'


echo "Flujo iniciado correctamente."
touch /tmp/draco-init.done