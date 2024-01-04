package com.taskmanager.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.entity.Task;
import com.taskmanager.service.TaskService;



@RestController
public class TaskController {
	
	Logger logger = Logger.getLogger(getClass().getName());
	
	@Autowired
	TaskService taskService;
	
	@PostMapping("/tasks")
	public Task createNewTask(@RequestBody Task task) {
		return taskService.createNewTask(task);
	}
	
	@GetMapping("/tasks")
	public List<Task> getAllTasks() {
		return taskService.getAllTasks();
	}
	
	@GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
//        return ResponseEntity.noContent().build();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/basicauth")
	public String basicAuthCheck() {
		return "Success"; 
	}
    
    @GetMapping(path = "/path-variable/{name}")
	public String getPathVariable(@PathVariable String name) {
		return name;
	}
	
}
