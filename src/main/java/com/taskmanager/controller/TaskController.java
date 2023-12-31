package com.taskmanager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
	
	@RequestMapping("/test")
	public String test() {
		return "Test";
	}
	
}
