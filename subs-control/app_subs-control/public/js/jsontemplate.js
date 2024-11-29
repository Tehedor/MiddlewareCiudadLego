document.getElementById('subscriptionForm').addEventListener('input', function() {
  const entity_id = document.getElementById('entity_id').value || 'PirSensor:1';
  const entity_type = document.getElementById('entity_type').value || 'PirSensor';
  const entity_attr = document.getElementById('entity_attr').value || '["type", "category", "presence", "controlledAsset"]';
  const entity_watch_attr = document.getElementById('entity_watch_attr').value || '["presence"]';
  const url_endpoint = document.getElementById('url_endpoint').value || 'uri_pirSensor';
  const notify_format = document.getElementById('notify_format').value || 'keyValues';
  const url_context = document.getElementById('url_context').value || 'http://context/datamodels.context-ngsi.jsonld';

  const jsonOutput = `
{
  "description": "Notify me of all feedstock changes",
  "type": "Subscription",
  "entities": [{"id": "urn:ngsi-ld:${entity_id}", "type": "${entity_type}"}],
  "watchedAttributes": ${entity_watch_attr},
  "notification": {
    "attributes": ${entity_attr},
    "format": "${notify_format}",
    "endpoint": {
      "uri": "${url_endpoint}",
      "accept": "application/json",
      "receiverInfo": [
        {
          "key": "fiware-service",
          "value": "openiot"
        }
      ]
    }
  },
  "@context": "${url_context}"
}`;
  document.getElementById('jsonOutput').textContent = jsonOutput;
});