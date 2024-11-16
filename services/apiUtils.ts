import apiClient from './apiClient';

// Example: Fetch Data
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example: Post Data
export const postData = async <T, P>(endpoint: string, payload: P): Promise<T> => {
  try {
    const response = await apiClient.post<T>(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
