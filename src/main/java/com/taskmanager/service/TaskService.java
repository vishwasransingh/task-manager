package com.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.entity.Task;
import com.taskmanager.repository.TaskRepository;

@Service
public class TaskService {
	@Autowired
	private TaskRepository taskRepository;
	
	public void createNewTask(Task task) {
        System.out.println(taskRepository.save(task));
    }
	
	public List<Task> getAllTasks() {
	    return taskRepository.findAll();
	}
	
}
