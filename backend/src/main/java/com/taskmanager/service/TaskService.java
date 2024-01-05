package com.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.entity.Task;
import com.taskmanager.error.ResourceNotFoundException;
import com.taskmanager.repository.TaskRepository;
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createNewTask(Task task) {
        task.setStatus(false);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task updateTask(Integer id, Task task) {
        if (taskRepository.existsById(id)) {
            task.setId(id);
            return taskRepository.save(task);
        }
        return null;
    }

    public boolean deleteTask(Integer taskId) {
        if (taskRepository.existsById(taskId)) {
            taskRepository.deleteById(taskId);
            return true;
        } else {
            throw new ResourceNotFoundException("Task not found with id: " + taskId);
        }
    }

    public void updateTaskStatus(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setStatus(!task.isStatus());
        taskRepository.save(task);
    }
}
