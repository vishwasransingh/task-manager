package com.taskmanager.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class for handling JWT authentication requests.
 */
@RestController
public class JwtAuthenticationController {

    private final JwtTokenService tokenService;

    private final AuthenticationManager authenticationManager;

    /**
     * Constructor for JwtAuthenticationController.
     *
     * @param tokenService          :  The JwtTokenService for generating JWT tokens.
     * @param authenticationManager :  The AuthenticationManager for authenticating users.
     */
    public JwtAuthenticationController(JwtTokenService tokenService,
                                       AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Endpoint for generating a JWT token based on the provided credentials.
     *
     * @param jwtTokenRequest : The request body containing the username and password.
     * @return ResponseEntity with a JwtTokenResponse containing the generated JWT token.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {

        // Create an authentication token with the provided username and password
        var authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(),
                        jwtTokenRequest.password());

        // Authenticate the user using the AuthenticationManager
        var authentication =
                authenticationManager.authenticate(authenticationToken);

        // Generate a JWT token using the authentication information
        var token = tokenService.generateToken(authentication);

        // Return the JWT token in a JwtTokenResponse within a ResponseEntity
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}
