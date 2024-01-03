import { apiClient } from './ApiClient'

export const retrieveAllTasksApi
    = () => apiClient.get(`/tasks`)

export const deleteTaskApi
    = (id) => apiClient.delete(`/tasks/${id}`)

export const retrieveTaskApi
    = (id) => apiClient.get(`/tasks/${id}`)

export const updateTaskApi
    = (id, task) => apiClient.put(`/tasks/${id}`, task)

export const createTaskApi
    = (task) => apiClient.post(`/tasks`, task)
