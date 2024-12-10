// const basePath = process.env.MODE_CONTAINERS === 'true' ? 'fiware-orion' : 'localhost';
// const url = `http://${basePath}:1026/ngsi-ld/v1/subscriptions/`;

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

async function updateSubscriptionsTo(state,basePath) {
  try {
    // const response = await fetch(`/subsControlApp/requests/updateSubscriptionsTo${state}`, {
    console.log(`${basePath}/requests/updateSubscriptionsTo${state}`);
    const response = await fetch(`${basePath}/requests/updateSubscriptionsTo${state}`, {
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

//- block scripts
//-     script.
//-         async function deleteSubscription(entity) {
//-                 console.log('entity:', entity);
//-             try {
//-                 const response = await fetch('/requests/deleteSubscriptions', {
//-                     method: 'POST',
//-                     headers: {
//-                         'Content-Type': 'application/json'
//-                     },
//-                     body: JSON.stringify(entity )
//-                 });
//-                 if (response.ok) {
//-                     alert('Subscription changed successfully');
//-                     location.reload(); // Actualiza la pantalla
//-                 } else {
//-                     alert('Error changing subscription');
//-                 }
//-             } catch (error) {
//-                 console.error('Error:', error);
//-                 alert('Error changing subscription');
//-             }
//-         }

//-         async function updateSubscriptionsTo(state) {
//-             try {
//-                 const response = await fetch(`/requests/updateSubscriptionsTo${state}`, {
//-                     method: 'POST',
//-                     headers: {
//-                         'Content-Type': 'application/json'
//-                     }
//-                 });
//-                 if (response.ok) {
//-                     alert(`Subscriptions updated to ${state} successfully`);
//-                     location.reload(); // Actualiza la pantalla
//-                 } else {
//-                     alert(`Error updating subscriptions to ${state}`);
//-                 }
//-             } catch (error) {
//-                 console.error('Error:', error);
//-                 alert(`Error updating subscriptions to ${state}`);
//-             }
//-         }
