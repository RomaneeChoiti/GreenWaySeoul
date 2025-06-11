import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://greenwayseoul.p-e.kr' // 배포 시
    : 'http://localhost:3030',       // 로컬 개발 시
  withCredentials: true,
});

export default axiosInstance;
