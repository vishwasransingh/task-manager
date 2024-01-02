import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './TaskApp.css';

export default function TaskManagerApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginComponent />} />
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/welcome/:username' element={<WelcomeComponent />} />
                <Route path='*' element={<ErrorComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

function LoginComponent() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('12345');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate(); // Access the navigate function from the hook

    function handleSubmit() {
        if (username === 'admin' && password === '12345') {
            console.log('Success');
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            navigate(`/welcome/${username}`); // Use backticks for string interpolation
        } else {
            console.log('Failed');
            setShowSuccessMessage(false);
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
            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials.</div>}
        </div>
    )
}

function WelcomeComponent() {
    const { username } = useParams();
    return (
        <div className="WelcomeComponent">
            <h1>Welcome, {username}!</h1>
        </div>
    )
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404. Reach out to our team at ABC-DEF-GHIJ.
            </div>
        </div>
    )
}
