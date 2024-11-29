function notify_template(entity_id, entity_type, entity_watch_attr, entity_attr, url_endpoint, notify_format, url_context) {
    return {
        "description": "Notify me of all feedstock changes",
        "type": "Subscription",
        "entities": [{"id": entity_id, "type": entity_type}],
        "watchedAttributes": entity_watch_attr,
        "notification": {
            "attributes": entity_attr,
            "format": notify_format,
            "endpoint": {
                "uri": url_endpoint,
                "accept": "application/json",
                "receiverInfo": [
                    {
                        "key": "fiware-service",
                        "value": "openiot"
                    }
                ]
            }
        },
        "@context": url_context
    };
}
// const Base = notify_template(
//     entity_id= `urn:ngsi-ld:bbbbbbb:${number}`, 
//     entity_type= "bbbbbbb",
//     entity_attr= bbbbbbb,
//     entity_watch_attr= ["bbbbbbb"],
//     url_endpoint= dragon_uri,
//     notify_format= defaultformat,url_context= default_url_context
// );

function updateSubscriptionTempleate( notify_format, url_endpoint) {
    return {
        "notification": {
            "format": notify_format,
            "endpoint": {
                "uri": url_endpoint,
                "accept": "application/json"
            },
        } 
    };
}
// Expose
module.exports = { notify_template, updateSubscriptionTempleate };