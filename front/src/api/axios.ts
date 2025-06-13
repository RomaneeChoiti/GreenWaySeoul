import axios from 'axios';
import Config from 'react-native-config';

console.log('Environment Variables:', Config);
console.log('Base URL:', Config.GWS_SERVER_API_URL);

const axiosInstance = axios.create({
    baseURL: Config.GWS_SERVER_API_URL,
    withCredentials: true,
});

export default axiosInstance;
