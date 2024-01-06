package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.entity.Task;

/**
 * Repository interface for accessing and managing Task entities in the database.
 * Extends JpaRepository, providing CRUD operations for Task entities.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
	
}
