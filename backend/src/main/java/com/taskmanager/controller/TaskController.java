package com.taskmanager.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.entity.Task;
import com.taskmanager.service.TaskService;

@RestController
public class TaskController {

    Logger logger = Logger.getLogger(getClass().getName());

    @Autowired
    TaskService taskService;

    /**
     * Creates a new task.
     *
     * @param task : The Task object to be created.
     * @return ResponseEntity with the created Task and HTTP status.
     */
    @PostMapping("/tasks")
    public ResponseEntity<Task> createNewTask(@RequestBody Task task) {
        try {
            Task createdTask = taskService.createNewTask(task);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.severe("Error creating task: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    /**
     * Gets all tasks.
     *
     * @return ResponseEntity with the list of tasks and HTTP status.
     */
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            logger.severe("Error getting tasks: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Gets a task by ID.
     *
     * @param id : The ID of the task to retrieve.
     * @return ResponseEntity with the requested task and HTTP status.
     */
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Integer id) {
        try {
            Task task = taskService.getTaskById(id);
            return task != null
                    ? new ResponseEntity<>(task, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.severe("Error getting task by ID: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates a task by ID.
     *
     * @param id : The ID of the task to update.
     * @param task : The updated Task object.
     * @return ResponseEntity with the updated Task and HTTP status.
     */
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task task) {
        try {
            Task updatedTask = taskService.updateTask(id, task);
            return updatedTask != null
                    ? new ResponseEntity<>(updatedTask, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.severe("Error updating task: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Deletes a task by ID.
     *
     * @param id : The ID of the task to delete.
     * @return ResponseEntity with HTTP status indicating success or failure.
     */
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        try {
            boolean deleted = taskService.deleteTask(id);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.severe("Error deleting task: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint for basic authentication check.
     *
     * @return ResponseEntity with a success message and HTTP status.
     */
    @GetMapping("/basicauth")
    public ResponseEntity<String> basicAuthCheck() {
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    /**
     * Updates the status of a task by ID.
     *
     * @param id : The ID of the task to update.
     * @return ResponseEntity with HTTP status indicating success or failure.
     */
    @PutMapping(path = "/tasks/{id}/status")
    public ResponseEntity<Void> updateTaskStatus(@PathVariable Integer id) {
        try {
            taskService.updateTaskStatus(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.severe("Error updating task status: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
