package com.taskmanager.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.entity.Task;
import com.taskmanager.error.ResourceNotFoundException;
import com.taskmanager.repository.TaskRepository;

/**
 * Service class for managing Task entities.
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Creates a new task and sets its status to false.
     *
     * @param task : The task to be created.
     * @return The created task.
     */
    public Task createNewTask(Task task) {
        task.setStatus(false);
        return taskRepository.save(task);
    }

    /**
     * Retrieves all tasks from the repository.
     *
     * @return List of all tasks.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Retrieves a task by its ID.
     *
     * @param id : The ID of the task to retrieve.
     * @return The task with the specified ID, or null if not found.
     */
    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }

    /**
     * Updates an existing task with the provided data.
     *
     * @param id : The ID of the task to update.
     * @param task : The updated task data.
     * @return The updated task, or null if the task with the specified ID doesn't exist.
     */
    public Task updateTask(Integer id, Task task) {
        if (taskRepository.existsById(id)) {
            task.setId(id);
            return taskRepository.save(task);
        }
        return null;
    }

    /**
     * Deletes a task by its ID.
     *
     * @param taskId : The ID of the task to delete.
     * @return true if the task was deleted, false otherwise.
     * @throws ResourceNotFoundException If the task with the specified ID doesn't exist.
     */
    public boolean deleteTask(Integer taskId) {
        if (taskRepository.existsById(taskId)) {
            taskRepository.deleteById(taskId);
            return true;
        } else {
            throw new ResourceNotFoundException("Task not found with id: " + taskId);
        }
    }

    /**
     * Toggles the status of a task (true to false or false to true).
     *
     * @param id : The ID of the task to update.
     * @throws ResourceNotFoundException If the task with the specified ID doesn't exist.
     */
    public void updateTaskStatus(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setStatus(!task.isStatus());
        taskRepository.save(task);
    }
}
