package com.taskmanager.authentication;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

public class BasicAuthenticationSecurityConfiguration {
	
	/**
     * Configures the security filter chain for JWT authentication.
     *
     * @param http The HttpSecurity object to configure.
     * @return A SecurityFilterChain configured for JWT authentication.
     * @throws Exception If an error occurs during configuration.
     */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return 
				http
					.authorizeHttpRequests(
						auth -> 
							auth
							.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
							.anyRequest().authenticated()
						)
					.httpBasic(Customizer.withDefaults())
					.sessionManagement(
						session -> session.sessionCreationPolicy
						(SessionCreationPolicy.STATELESS))
					.csrf().disable() // Disable CSRF for stateless authentication
					.build();
	}

}
