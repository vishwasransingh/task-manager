package com.taskmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TaskManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerApplication.class, args);
	}

	/**
	 * Configures CORS (Cross-Origin Resource Sharing) for the application.
	 * @return An instance of WebMvcConfigurer to customize the configuration.
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			/**
             * Adds CORS mappings for all endpoints, allowing all methods and only allowing
             * requests from "http://localhost:3000".
             * @param registry : The CORS registry to add mappings to.
             */
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*")
				.allowedOrigins("http://localhost:3000");
			}
		};
	}

}
