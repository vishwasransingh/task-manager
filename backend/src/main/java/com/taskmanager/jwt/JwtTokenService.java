package com.taskmanager.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

/**
 * Service class for generating JWT tokens.
 */
@Service
public class JwtTokenService {
    
    private final JwtEncoder jwtEncoder;

    /**
     * Constructs a JwtTokenService with the specified JwtEncoder.
     *
     * @param jwtEncoder : The JwtEncoder used for encoding JWT tokens.
     */
    public JwtTokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }
    
    /**
     * Generates a JWT token based on the provided authentication.
     *
     * @param authentication : The authentication object containing user details.
     * @return The generated JWT token.
     */
    public String generateToken(Authentication authentication) {

    	// Create a scope string from authorities (roles)
        var scope = authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(" "));

     // Build JwtClaimsSet with token claims
        var claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plus(90, ChronoUnit.MINUTES))
                        .subject(authentication.getName())
                        .claim("scope", scope)
                        .build();

        // Encode JWT using JwtEncoder
        return this.jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}


