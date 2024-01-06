import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import {executeBasicAuthenticationService} from "./AuthenticationApiService";

/**
 * Manages the authentication state within the React application.
 * Provides an AuthContext with authentication-related state variables and methods to child components.
 * - State Management: Tracks authentication status, username, and token.
 * - Login Function: Handles user login, token generation, and authentication validation.
 * - Logout Function: Resets authentication state, username, and token.
 * - Context Provider: Wraps the application, providing child components access to authentication state and methods.
 */

// Create a context to manage authentication state and methods
export const AuthContext = createContext()

// Custom hook to consume the AuthContext within components
export const useAuth = () => useContext(AuthContext)

// AuthProvider component to wrap the application and manage authentication state
export default function AuthProvider({ children }) {

    // State variables to track authentication status, username, and token
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // Function to handle user login
    async function login(username, password) {

        // Create a Basic Authentication token
        const baToken = 'Basic ' + window.btoa( username + ":" + password )

        try {
            // Call the authentication service to validate the credentials
            const response = await executeBasicAuthenticationService(baToken)

            if(response.status==200){
                // Set authentication state and store username and token
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                // Intercept requests to add the token to the headers
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )
                
                return true            
            } else {
                // Perform logout if authentication fails
                logout()
                return false
            }    
        } catch(error) {
            return false
        }
    }

    // Function to handle logout
    function logout() {
        // Reset authentication state, username, and token
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
        window.location.reload();
    }

    // Provide the AuthContext value to the wrapped components
    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 