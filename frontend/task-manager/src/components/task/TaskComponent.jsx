import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveTaskApi, updateTaskApi, createTaskApi } from './api/TaskApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

/**
 * TaskComponent - Component for displaying and editing task details.
 * Retrieves and displays existing task details (Update).
 * Allows the user to create a new task (Create).
 */
export default function TaskComponent() {
    // Extracting the task ID from the route parameters
    const {id} = useParams()

    // State variables for task details
    const[title, setTitle] = useState('')
    const[targetDate, setTargetDate] = useState('')
    const[status, setStatus] = useState(false)

    // Hook for programmatic navigation
    const navigate = useNavigate()
    
    // Effect to retrieve task details when the component mounts or the task ID changes
    useEffect(
        () => retrieveTask(),
        [id]
        )

    // Function to retrieve task details from the API
    function retrieveTask(){
        if(id != -1) {
            retrieveTaskApi(id)
            .then(response => {
                setTitle(response.data.title)
                setTargetDate(response.data.targetDate)
                setStatus(response.data.status)
            })
            .catch(error => console.log(error))
        }
    }

    // Function to handle form submission (create or update task)
    function onSubmit(values) {
        console.log(values)
        
        const task = {
            id: id,
            title: values.title,
            targetDate: values.targetDate,
            status: values.status
        }

        console.log(task)

        // If the task ID is '-1', it's a new task (create), otherwise update the existing task
        if(id==-1) {
            createTaskApi(task)
            .then(response => {
                navigate('/tasks')
            })
            .catch(error => console.log(error))
    
        } else {
            updateTaskApi(id, task)
            .then(response => {
                navigate('/tasks')
            })
            .catch(error => console.log(error))
        }
    }

    // Function to validate form values
    function validate(values) {
        let errors = {
            // title: 'Enter a valid title',
            // targetDate: 'Enter a valid target date'
        }

        if(values.title.length<5) {
            errors.title = 'Enter atleast 5 characters'
        }

        if(values.targetDate == null || values.targetDate=='' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Task Details</h1>
            <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', backgroundColor: '#f9f9f9' }}>
                {/* Formik component for handling form state and validation */}
                <Formik initialValues={{ title, targetDate, status }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {/* Form container for entering and editing task details */}
                    {(props) => (
                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <Form>
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="alert alert-warning"
                                />
    
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
    
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field type="text" className="form-control" name="title" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}