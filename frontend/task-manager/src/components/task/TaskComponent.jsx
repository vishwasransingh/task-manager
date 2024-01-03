import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { retrieveTaskApi, updateTaskApi, createTaskApi } from './api/TaskApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function TaskComponent() {
    
    const {id} = useParams()
    
    const[title, setTitle] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    
    //const username = authContext.username
    
    useEffect(
        () => retrieveTask(),
        [id]
        )

    function retrieveTask(){
        if(id != -1) {
            retrieveTaskApi(id)
            .then(response => {
                setTitle(response.data.title)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        
        const task = {
            id: id,
            title: values.title,
            targetDate: values.targetDate,
        }

        console.log(task)

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
            <h1>Enter Task Details </h1>
            <div>
                <Formik initialValues={ { title, targetDate } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="title"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Title</label>
                                <Field type="text" className="form-control" name="title" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
}