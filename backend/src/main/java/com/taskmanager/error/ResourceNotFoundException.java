package com.taskmanager.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception class representing a resource not found error.
 * This exception is annotated with @ResponseStatus to indicate
 * that when thrown, it should result in a 404 Not Found HTTP response.
 */
@SuppressWarnings("serial")
@ResponseStatus(code=HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
	
	/**
     * Constructs a new ResourceNotFoundException with the specified detail message.
     *
     * @param message : The detail message (which is saved for later retrieval 
     * by the getMessage() method).
     */
	public ResourceNotFoundException(String message) {
		super(message);
	}
	
}
