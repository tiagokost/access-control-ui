
import axios from "axios";
import { getToken } from "./Auth";

// Configurations API URLBASE
//
//
export var ApiHostBase = 'http://18.224.123.42:8080/';

export var HeaderRequest =  {
    'Authorization': 'Basic ZGV2c2NhcGU6MTIzNDU2',
    'Content-Type': 'application/json'
};

const api = axios.create({
  baseURL: ApiHostBase
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
