/**
 * Valida si un valor es un número mayor que cero.
 * @param {any} value - El valor a validar.
 * @returns {boolean} - True si el valor es un número mayor que cero, de lo contrario false.
 */
function isPositiveNumber(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const number = parseInt(value);
    return !isNaN(number) && number > 0;
}

const moment = require('moment');

/**
 * Valida si una fecha tiene un formato válido.
 * @param {string} date - La fecha a validar.
 * @param {string} format - El formato esperado de la fecha.
 * @returns {boolean} - True si la fecha tiene un formato válido, de lo contrario false.
 */
function isValidDate(date, format = 'YYYY-MM-DDTHH:mm:ss') {
    return moment(date, format, true).isValid();
}

/**
 * Valida si la fecha 'desde' es menor o igual que la fecha 'hasta'.
 * @param {string} desde - La fecha de inicio.
 * @param {string} hasta - La fecha de fin.
 * @param {string} format - El formato esperado de las fechas.
 * @returns {boolean} - True si 'desde' es menor o igual que 'hasta', de lo contrario false.
 */
function isDesdeMenorQueHasta(desde, hasta, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') {
    if (!isValidDate(desde, format) || !isValidDate(hasta, format)) {
        return false;
    }
    return moment(desde, format).isSameOrBefore(moment(hasta, format));
}

/**
 * Establece la fecha 'hasta' a la fecha actual si 'desde' tiene contenido y 'hasta' no.
 * @param {string} desde - La fecha de inicio.
 * @param {string} hasta - La fecha de fin.
 * @param {string} format - El formato esperado de las fechas.
 * @returns {string} - La fecha 'hasta' ajustada.
 */
function setDefaultHastaIfNeeded(desde, hasta, format = 'YYYY-MM-DDTHH:mm:ss') {
    if (desde && !hasta) {
        return moment().format(format);
    }
    return hasta;
}


/**
 * Valida si un valor es un número mayor que cero.
 * @param {any} value - El valor a validar.
 * @returns {boolean} - True si el valor es un número mayor que cero, de lo contrario false.
 */
function isPositiveNumber(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const number = parseInt(value);
    return !isNaN(number) && number > 0;
}

/**
 * Valida si un valor es un número.
 * @param {any} value - El valor a validar.
 * @returns {boolean} - True si el valor es un número, de lo contrario false.
 */
function isNumber(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const number = parseFloat(value);
    return !isNaN(number);
}

/**
 * Establece valores predeterminados para `min` y `max` si uno de ellos está definido y el otro no.
 * @param {number} min - El valor mínimo.
 * @param {number} max - El valor máximo.
 * @returns {object} - Un objeto con los valores ajustados de `min` y `max`.
 */
function setDefaultMinMax(min, max) {
    if (min === undefined || min === null) {
        min = max !== undefined && max !== null ? -1000000 : null;
    }
    if (max === undefined || max === null) {
        max = min !== undefined && min !== null ? 1000000 : null;
    }
    return { min, max };
}


module.exports = {
    isPositiveNumber,
    isValidDate,
    isDesdeMenorQueHasta,
    setDefaultHastaIfNeeded,
    isPositiveNumber,
    isNumber,
    setDefaultMinMax
};