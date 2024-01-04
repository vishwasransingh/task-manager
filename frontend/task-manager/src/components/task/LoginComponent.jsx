import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('12345');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    async function handleSubmit() {
        
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials.</div>}
        </div>
    )
}