import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./security/AuthContext";

/**
 * LoginComponent - Component for the login page.
 * Allows users to enter their credentials and log in.
 */
export default function LoginComponent() {
    // State variables for managing input fields and error message visibility
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    // Hook for navigation
    const navigate = useNavigate();

    // Access the authentication context using the useAuth hook
    const authContext = useAuth();

    // Function to handle form submission (login attempt)
    async function handleSubmit() {
        // Attempt to log in using provided credentials
        if (await authContext.login(username, password)) {
            // If successful, navigate to the welcome page
            navigate(`/welcome/${username}`);
        } else {
            // If login fails, display an error message
            setShowErrorMessage(true);
        }
    }

    // Event handler for username input field changes
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    // Event handler for password input field changes
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        // Login UI
        <div className="Login container" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', backgroundColor: '#f9f9f9' }}>
            <h1>Login Page</h1>
            <div className="LoginForm" style={{ maxWidth: '250px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name:</label>
                    <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleUsernameChange} style={{textAlign:"center"}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} style={{textAlign:"center"}}/>
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Login</button>
                </div>
            </div>
            {showErrorMessage && <div className="alert alert-danger">Authentication Failed. Please check your credentials.</div>}
        </div>
    );
    
}