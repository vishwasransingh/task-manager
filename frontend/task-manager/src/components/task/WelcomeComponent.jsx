import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { retrievePathVariable } from './security/AuthenticationApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent() {
    const { username } = useParams();
    const authContext = useAuth();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate(); // Import useNavigate

    function successfulResponse(response) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    function navigateToTasks() {
        // Use the navigate function to redirect to the desired URL
        navigate('/tasks');
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                <button className="btn btn-success m-5" onClick={navigateToTasks}>
                    Manage Your Tasks
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    );
}

export default WelcomeComponent;
