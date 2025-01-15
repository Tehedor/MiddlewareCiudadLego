function formatNgsiID(ngsiID) {
  return ngsiID.replace(/(\w+?)(\d+)$/, (match, p1, p2) => {
    const formattedNumber = p2.padStart(3, '0'); // Añadir ceros a la izquierda si es necesario
    return `urn:ngsi-ld:${p1}:${formattedNumber}`;
  });
}

module.exports = formatNgsiID;