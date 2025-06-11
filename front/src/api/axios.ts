import axios from 'axios';

const axiosInstance = axios.create({
  // 배포 시
  baseURL: 'https://greenwayseoul.p-e.kr',
  // 로컬 개발 시
  // baseURL: 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
