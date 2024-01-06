import { apiClient } from "../api/ApiClient"

// Function to execute a Basic Authentication service using a provided token
export const executeBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`
    ,{
        // Include the provided token in the request headers for Basic Authentication
        headers: {
            Authorization: token
        }
    }
    )