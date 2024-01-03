import { apiClient } from "../api/ApiClient"

export const executeBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )

export const retrievePathVariable
    = (username, token) => apiClient.get(`/path-variable/${username}`)