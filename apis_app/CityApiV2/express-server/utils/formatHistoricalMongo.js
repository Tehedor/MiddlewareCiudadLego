const formatHistoricalMongo = (sensoresData, orden = 'descendente') => {
    // Verifica que los datos existen y están en el formato correcto antes de mapear
    const mappedData = sensoresData.map(sensor => {
        const { notifiedAt, data } = sensor;
        return data.map(entity => {
            const { id, type, ...attributes } = entity;
            const data = Object.entries(attributes).map(([key, value]) => ({
                timestamp: notifiedAt,
                value: value.value,
                unitCode: value.unitCode
            }));
            return { id, type, data };
        });
    }).flat();

    // Agrupar los datos por id y type
    const groupedData = mappedData.reduce((acc, curr) => {
        const { id, type, data } = curr;
        const key = `${id}-${type}`;
        if (!acc[key]) {
            acc[key] = { id, type, historical: [] };
        }
        acc[key].historical.push(...data.map(d => ({ timestamp: d.timestamp, value: d.value, unitCode: d.unitCode })));
        return acc;
    }, {});

    // Ordenar los datos históricos según el parámetro de orden
    const sortedData = Object.values(groupedData).map(item => {
        item.historical.sort((a, b) => {
            if (orden === 'ascendente') {
                return new Date(a.timestamp) - new Date(b.timestamp);
            } else {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
        });
        return {
            ...item,
            historical_len: item.historical.length
        };
    });

    return sortedData;
};

const formatHistoricalCameraMongo = (sensoresData, orden = 'descendente') => {
    // Verifica que los datos existen y están en el formato correcto antes de mapear
    const mappedData = sensoresData.map(sensor => {
        const { notifiedAt, data } = sensor;
        return data.map(entity => {
            const { id, type, mediaURL, on } = entity;
            const historical = [{
                timestamp: notifiedAt,
                value: on.value ? 'ON' : 'OFF',
                mediaURL: mediaURL.value
            }];
            return { id, type, historical };
        });
    }).flat();

    // Agrupar los datos por id y type
    const groupedData = mappedData.reduce((acc, curr) => {
        const { id, type, historical } = curr;
        const key = `${id}-${type}`;
        if (!acc[key]) {
            acc[key] = { id, type, historical: [] };
        }
        acc[key].historical.push(...historical);
        return acc;
    }, {});

    // Ordenar los datos históricos según el parámetro de orden
    const sortedData = Object.values(groupedData).map(item => {
        item.historical.sort((a, b) => {
            if (orden === 'ascendente') {
                return new Date(a.timestamp) - new Date(b.timestamp);
            } else {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
        });
        return {
            ...item,
            historical_len: item.historical.length
        };
    });

    return sortedData;
};

module.exports = {
    formatHistoricalMongo,
    formatHistoricalCameraMongo
};