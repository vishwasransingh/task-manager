import { apiClient } from './ApiClient'

/**
 * Contains API calls for CRUD Operations.
 */

// Retrieve all tasks from the API
export const retrieveAllTasksApi
    = () => apiClient.get(`/tasks`)

// Delete a task by ID
export const deleteTaskApi
    = (id) => apiClient.delete(`/tasks/${id}`)

// Retrieve a specific task by ID
export const retrieveTaskApi
    = (id) => apiClient.get(`/tasks/${id}`)

// Update a task by ID
export const updateTaskApi
    = (id, task) => apiClient.put(`/tasks/${id}`, task)

// Create new Task
export const createTaskApi
    = (task) => apiClient.post(`/tasks`, task)

// Update the status of a task
export const updateTaskStatusApi
    = (id) => apiClient.put(`/tasks/${id}/status`)