function formatNgsiID(ngsiID) {
  // Verificar si el ngsiID termina en un número
  if (!/\d+$/.test(ngsiID)) {
    return false;
  }

  // Verificar si el número tiene más de 3 dígitos
  const match = ngsiID.match(/(\d+)$/);
  if (match && match[0].length > 3) {
    return false;
  }

  return ngsiID.replace(/(\w+?)(\d+)$/, (match, p1, p2) => {
    const formattedNumber = p2.padStart(3, '0'); // Añadir ceros a la izquierda si es necesario
    return `urn:ngsi-ld:${p1}:${formattedNumber}`;
  });
}

module.exports = formatNgsiID;