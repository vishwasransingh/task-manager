import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from 'react-router-dom';
import './TaskApp.css';

export default function TaskManagerApp() {
    return (
        <BrowserRouter>
            <div className="TodoApp">
                <HeaderComponent />                               
                
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/logout' element={<LogoutComponent /> } />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/welcome/:username' element={<WelcomeComponent />} />
                        <Route path='/tasks' element={<TaskListComponent /> } />
                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                
                <FooterComponent />
            </div>
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
            <h1>Welcome {username}</h1>
            <div>
                <Link to="/tasks">Task List</Link>
            </div>
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

function TaskListComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    const tasks = [
                    {id: 1, title: 'Task1', targetDate:targetDate},
                    {id: 2, title: 'Task2', targetDate:targetDate},
                    {id: 3, title: 'Task3', targetDate:targetDate},
                ]


    return (
        <div className="container">
            <h1>Your Tasks : </h1>
            <div>
                <table>
                    <thead>
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                <td>Target Date</td>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(
                            task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }

                    </tbody>

                </table>
            </div>
        </div>
    )
}

function HeaderComponent() {
    return (
        <div className="header">
            <header className="border-bottom border-light border-5 mb-5 p-2">
                <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item fs-5 mr-3"><Link to="/tasks">Tasks</Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5 mr-3"><Link to="/login">Login</Link></li>
                        <li className="nav-item fs-5"><Link to="/logout">Logout</Link></li>
                    </ul>
                    </div>
                </nav>
                </div>
            </header>
        </div>

    )
}

function FooterComponent() {
    return (
        <div className="footer">
            <hr/> Footer 
        </div>
    )
}

function LogoutComponent() {
    return (
        <div className="LogoutComponent">
            <h1>You are logged out!</h1>
            <div>
                Thank you!
            </div>
        </div>
    )
}