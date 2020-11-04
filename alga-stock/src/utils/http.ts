import axios from 'axios';

// const http = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});
// const http = axios.create({baseURL: 'http://localhost:3024'});
const http = axios.create({
  baseURL: 'http://localhost:4010', 
  headers: {
    authorization: 'Bearer 123'
  }
});

export default http;