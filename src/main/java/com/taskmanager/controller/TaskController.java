package com.taskmanager.controller;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
	public void createNewTask(@RequestBody Task task) {
		taskService.createNewTask(task);
	}
	
}
