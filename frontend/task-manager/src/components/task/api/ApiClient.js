import axios from 'axios'

// Creating an instance of axios to configure base URL
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'    // Base URL for making API requests.
    }
);
