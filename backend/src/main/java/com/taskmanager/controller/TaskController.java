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

    @GetMapping("/basicauth")
    public ResponseEntity<String> basicAuthCheck() {
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping(path = "/path-variable/{name}")
    public ResponseEntity<String> getPathVariable(@PathVariable String name) {
        return new ResponseEntity<>(name, HttpStatus.OK);
    }

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
