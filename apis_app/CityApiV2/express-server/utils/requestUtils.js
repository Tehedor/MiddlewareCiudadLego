const EnvConfig = require('../../utils/env.config');

const axios = require('axios');

const {  remapDataModeRelations, remapDataModeInfo, remapDataModeDetails, remapDataModeValue, remapDataModeValueCamera } = require("./remapModes");

const {sendToBlackList} = require("./controlCheckIfIsXXX"); 

const { mode_container } = EnvConfig();

const basePath = mode_container ? 'fiware-orion' : 'localhost';
const url = `http://${basePath}:1026/ngsi-ld/v1/entities`;
const headers = {
    'Accept': 'application/ld+json',
    'Link': '<http://context/datamodels.context-ngsi.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'
};


const getRemapFunction = (style) => {
  switch (style) {
    case "relations":
      return remapDataModeRelations;
    case "details":
      return remapDataModeDetails;
    case "value":
      return remapDataModeValue;
    default:
      return remapDataModeInfo;
  }
};

const getRemapFunctionCamera = (style) => {
  switch (style) {
    case "relations":
      return remapDataModeRelations;
    case "details":
      return remapDataModeDetails;
    case "value":
      return remapDataModeValueCamera;
    default:
      return remapDataModeInfo;
  }
};

// const handleAxiosError = (error, ngsiID, sendToBlackList, res) => {
const handleAxiosError = (error, ngsiID, res) => {
  // console.error("Error fetching data:", error);
  sendToBlackList(ngsiID);
  res.status(500).send("Error fetching data");
};

// Fetch to the Context
const fetchDataWithId = async (ngsiID, urlQuery) => {
  console.log(`${url}/${ngsiID}${urlQuery}`);
  return  response = await axios.get(`${url}/${ngsiID}${urlQuery}`, { headers });
};

const fetchDataComponents  = async (urlQuery) => {
  console.log(`${url}/${urlQuery}`);
  return  response = await axios.get(`${url}/${urlQuery}`, { headers });
};


const fetchData = async (urlQuery) => {
  return response = await axios.get(`${url}${urlQuery}`, {headers});
};

// Exports
module.exports = {
  getRemapFunction,
  getRemapFunctionCamera,
  handleAxiosError,
  fetchData,
  fetchDataComponents,
  fetchDataWithId
};