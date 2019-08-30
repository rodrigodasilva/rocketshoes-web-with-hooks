import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/rodrigodasilva/api-rocketshoes',
});

export default api;
