package com.taskmanager.jwt;

/**
 * A record representing a JWT token request containing a username and password.
 */
public record JwtTokenRequest(String username, String password) {}


