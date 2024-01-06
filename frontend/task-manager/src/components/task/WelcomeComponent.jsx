import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
 * WelcomeComponent - Component for displaying a welcome message.
 * Allows users to navigate to the task management page.
 */
function WelcomeComponent() {
    // Extract the username from the route parameters
    const { username } = useParams();

    // State variable for displaying messages
    const [message] = useState(null);
    const navigate = useNavigate(); // Import useNavigate

    // Function to navigate to the tasks page
    function navigateToTasks() {
        // Use the navigate function to redirect to the desired URL
        navigate('/tasks');
    }

    return (
        <div className="WelcomeComponent">
            {/* Display a welcome message with the username */}
            <h1>Welcome {username}</h1>
            <div>
                {/* Button to navigate to the task management page */}
                <button className="btn btn-success m-5" onClick={navigateToTasks}>
                    Manage Your Tasks
                </button>
            </div>
            {/* For displaying any informative messages */}
            <div className="text-info">{message}</div>
        </div>
    );
}

export default WelcomeComponent;
