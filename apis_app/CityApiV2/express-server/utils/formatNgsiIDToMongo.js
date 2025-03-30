  function formatNgsiIDToMongo(ngsiID) {
    // Reemplaza los dos puntos (:) por guiones bajos (_)
    return 'sth_' + ngsiID.replace(/:/g, '_');
}


module.exports = formatNgsiIDToMongo;