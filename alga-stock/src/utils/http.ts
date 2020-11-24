import axios from 'axios';
import {store} from '../redux';

// const http = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});
// const http = axios.create({baseURL: 'http://localhost:3024'});

const http = axios.create({
  // baseURL: 'http://localhost:4010', // mockserver
  // baseURL: 'http://localhost:3024', // API local 
  baseURL: 'http://nyl-api-alga-stock.herokuapp.com' // API Heroku
  // headers: {
  //   authorization: 'Bearer 123'
  // }
});

http.interceptors.request.use((config) => {
  const token = store.getState().authentication.profile?.token;
  
  if(token)
    config.headers.Authorization = `Bearer ${token}`
  
    return config;
})

export default http;