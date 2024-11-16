// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// // Define a generic response type
// interface ApiResponse<T = any> {
//   data: T;
//   status: number;
//   message?: string; // Optional field for custom error messages
// }

// // Create an Axios instance
// const apiClient: AxiosInstance = axios.create({
//   baseURL: 'https://api.example.com', // Replace with your API's base URL
//   timeout: 10000, // Request timeout in milliseconds
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem('authToken'); // Replace with your auth system
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response: AxiosResponse): ApiResponse => {
//     return {
//       data: response.data,
//       status: response.status,
//     };
//   },
//   (error) => {
//     if (error.response) {
//       console.error('API Error:', error.response.data);
//     } else if (error.request) {
//       console.error('No response received:', error.request);
//     } else {
//       console.error('Request setup error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
