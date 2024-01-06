import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllTasksApi, deleteTaskApi, updateTaskStatusApi } from './api/TaskApiService'
import { useAuth } from "./security/AuthContext"

/**
 * TaskListComponent - Component for displaying and managing a list of tasks.
 * Allows users to view, delete, update, and add new tasks.
 */
function TaskListComponent() {

    // Hook for navigation
    const navigate = useNavigate()
    
    // State variables for tasks, message, and loading state
    const [tasks, setTasks] = useState([])
    const [message,setMessage] = useState(null)
    
    // Effect to retrieve tasks when the component mounts
    useEffect ( () => refreshTasks(), [])

    // Function to retrieve all tasks from the API
    function refreshTasks() {
        retrieveAllTasksApi()
        .then(response => {
            setTasks(response.data)
        }
            
        )
        .catch(error => console.log(error))
    }

    // Function to handle task deletion
    function deleteTask(id) {
        deleteTaskApi(id)
        .then(

            () => {
                setMessage(`Successfully deleted task with id : ${id}`)
                // Set a timer to hide the error message after 5000 milliseconds (5 seconds)
                setTimeout(() => {
                    setMessage(false);
                }, 5000);
                refreshTasks()
            }

        )
        .catch(error => console.log(error))
    }

    // Function to navigate to the task update page
    function updateTask(id) {
        navigate(`/tasks/${id}`)       
    }

    // Function to navigate to the task creation page to add a new task
    function addNewTask() {
        navigate(`/tasks/-1`)
    }

    // Function to handle checkbox change and update task status
    function handleCheckboxChange(id) {
        updateTaskStatusApi(id)
        .then(
            () => {
                setMessage(`Completion status of task with id : ${id} was toggled successfully.`)
                // Set a timer to hide the error message after 5000 milliseconds (5 seconds)
                setTimeout(() => {
                    setMessage(false);
                }, 5000);

                refreshTasks()
            }
        )
        .catch(error => console.log(error))
    }

    return (
        // TaskList Component UI container
        <div className="container">
            <h1>Your Tasks</h1>

            {/* Display a message if available */}
            {message && <div className="alert alert-warning">{message}</div>}

            {/* Display a table of tasks */}
            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Title</th>
                                <th>Target Date</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(
                            task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.targetDate.toString()}</td>
                                    <td>
                                        {/* Checkbox to toggle task status */}
                                        <input
                                        type="checkbox"
                                        checked={task.status}
                                        onChange={() => handleCheckboxChange(task.id)}
                                        />
                                    </td>
                                    {/* Button to delete task */}
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteTask(task.id)}>Delete</button> </td>
                                    {/* Button to update task */}
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateTask(task.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            {/* Button to add a new task */}
            <div className="btn btn-success m-5" onClick={addNewTask}>Add New Task</div>
        </div>
    )
}

export default TaskListComponent