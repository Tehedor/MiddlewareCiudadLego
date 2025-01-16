import axios from 'axios';

import EnvConfig from './env.config';

const {mode_container, next_public_api_base_url} = EnvConfig();

// Configura la URL base dinámicamente
const baseURL = mode_container === 'true'
  ? next_public_api_base_url || 'http://localhost/apisApp'
  : 'http://localhost:3000';

// Crea una instancia de Axios con una configuración personalizada
const instance = axios.create({
  baseURL: baseURL,
});


export default instance;