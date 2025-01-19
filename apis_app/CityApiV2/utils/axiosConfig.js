import axios from 'axios';


function convertToBoolean(envVar) {
  return envVar ? envVar === 'true' : false;
}

// const baseURL = convertToBoolean(process.env.MODE_CONTAINER) ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/apisApp'  : 'http://localhost:3000';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});


export default instance;