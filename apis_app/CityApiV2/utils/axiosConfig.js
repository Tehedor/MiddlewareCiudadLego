import axios from 'axios';

import EnvConfig from './env.config';


const {mode_container} = EnvConfig();



const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH || '',
});

export default instance;