// const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
// const url = `http://${basePath}:1026/ngsi-ld/v1/subscriptions/`;

// Petición para obtener el estado actual de las suscripciones
async function deleteSubscription(entity,basePath) {
  console.log("entity:", entity);
  try {
    const response = await fetch(`${basePath}/requests/deleteSubscriptions`, {
    // const response = await fetch(`/subsControlApp/requests/deleteSubscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
    if (response.ok) {
      alert("Subscription changed successfully");
      location.reload(); // Actualiza la pantalla
    } else {
      alert("Error changing subscription");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error changing subscription");
  }
}

// Petición para actualizar las suscripciones a 'Simulator'
async function updateSubscriptionsTo(state,basePath) {
  try {
    // const response = await fetch(`/subsControlApp/requests/updateSubscriptionsTo${state}`, {
    console.log(`${basePath}/requests/changeState?mode=${state}`);
    // const response = await fetch(`${basePath}/requests/updateSubscriptionsTo${state}`, {
      // const response = await fetch(`http://localhost/subsControlApp/requests/changeState?mode=${state}`, {
    const response = await fetch(`${basePath}/requests/changeState?mode=${state}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert(`Subscriptions updated to ${state} successfully`);
      location.reload(); // Actualiza la pantalla
    } else {
      alert(`Error updating subscriptions to ${state}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert(`Error updating subscriptions to ${state}`);
  }
}


// @SubID = 146cb284-cbdb-11ef-b77d-0242ac120105
// ### Actualizar suscripción
// PATCH http://localhost:1026/ngsi-ld/v1/subscriptions/urn:ngsi-ld:subscription:{{SubID}}
// Content-Type: application/ld+json

// {
//     "isActive": true,
//     "@context": "http://context/datamodels.context-ngsi.jsonld"
// }

// Petición para reactivar la suscripción
async function reactivateSubscription(entity,basePath) {
  console.log("entity:", entity);
  try {
    const response = await fetch(`${basePath}/requests/reactivateSubscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
    if (response.ok) {
      alert("Subscription reactivated successfully");
      location.reload(); // Actualiza la pantalla
    } else {
      alert("Error changing subscription");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error changing subscription");
  }
}

