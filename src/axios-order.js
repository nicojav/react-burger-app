import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-37fbb.firebaseio.com/'
})

export default instance;