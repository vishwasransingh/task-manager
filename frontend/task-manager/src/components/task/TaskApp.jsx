import React, { useState } from 'react';
import './TaskApp.css';

export default function TaskManagerApp() {
    return (
        <div className="TaskManagerApp">
            <LoginComponent />
        </div>
    )
}

function LoginComponent() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('12345');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    function handleSubmit() {
        if (username === 'admin' && password === '12345') {
            console.log('Success');
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
        } else {
            console.log('Failed');
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
            <SuccessMessageComponent showSuccessMessage={showSuccessMessage} />
            <ErrorMessageComponent showErrorMessage={showErrorMessage} />
        </div>
    )
}

function SuccessMessageComponent({ showSuccessMessage }) {
    return showSuccessMessage ? <div className="successMessage">Authenticated Successfully</div> : null;
}

function ErrorMessageComponent({ showErrorMessage }) {
    return showErrorMessage ? <div className="errorMessage">Authentication Failed. Please check your credentials.</div> : null;
}
