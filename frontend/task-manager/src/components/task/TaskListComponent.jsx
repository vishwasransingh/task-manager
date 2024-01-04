import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { retrieveAllTasksApi, deleteTaskApi, updateTaskStatusApi } from './api/TaskApiService'
import { useAuth } from "./security/AuthContext"

function TaskListComponent() {

    const today = new Date()

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [tasks, setTasks] = useState([])

    const [message,setMessage] = useState(null)
    
    useEffect ( () => refreshTasks(), [])

    function refreshTasks() {
        
        retrieveAllTasksApi()
        .then(response => {
            setTasks(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteTask(id) {
        console.log('clicked ' + id)
        deleteTaskApi(id)
        .then(

            () => {
                setMessage(`Deletion of task with id = ${id} successful`)
                refreshTasks()
            }

        )
        .catch(error => console.log(error))
    }

    function updateTask(id) {
        console.log('clicked ' + id)
        navigate(`/tasks/${id}`)
    }

    function addNewTask() {
        navigate(`/tasks/-1`)
    }

    function handleCheckboxChange(id) {
        console.log('clicked ' + id)
        
        updateTaskStatusApi(id)
        .then(

            () => {
                setMessage(`Status of task with id = ${id} changed.`)
                refreshTasks()
            }

        )
        .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>Your Tasks</h1>
            
            {message && <div className="alert alert-warning">{message}</div>}

            
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
                                        <input
                                        type="checkbox"
                                        checked={task.status}
                                        onChange={() => handleCheckboxChange(task.id)}
                                        />
                                    </td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteTask(task.id)}>Delete</button> </td>
                                    <td> <button className="btn btn-success" 
                                                    onClick={() => updateTask(task.id)}>Update</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTask}>Add New Task</div>
        </div>
    )
}

export default TaskListComponent