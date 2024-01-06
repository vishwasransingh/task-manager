package com.taskmanager.jwt;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

// JWT Security configuration class.
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtSecurityConfig {

	 /**
     * Configures the security filter chain for JWT authentication.
     *
     * @param httpSecurity : The HttpSecurity object to configure.
     * @return A SecurityFilterChain configured for JWT authentication.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // (1)
                .sessionManagement(
                        session -> 
                            session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS)) // (2)
                .authorizeRequests(
                        auth -> 
                            auth.requestMatchers("/authenticate", "/actuator", "/actuator/*")
                                .permitAll()
                                .requestMatchers(HttpMethod.OPTIONS,"/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()) // (3)
                .oauth2ResourceServer(
                        OAuth2ResourceServerConfigurer::jwt) // (4)
                .exceptionHandling(
                        (ex) -> 
                            ex.authenticationEntryPoint(
                                new BearerTokenAuthenticationEntryPoint())
                              .accessDeniedHandler(
                                new BearerTokenAccessDeniedHandler()))
                .httpBasic(
                        Customizer.withDefaults()) // (5)
                .build();
    }

    /**
     * Configures the AuthenticationManager for JWT authentication.
     *
     * @param userDetailsService The userDetailsService to use for authentication.
     * @return An AuthenticationManager configured for JWT authentication.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService) {
        var authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(authenticationProvider);
    }

    /**
     * Provides a simple in-memory UserDetailsService for testing purposes.
     *
     * @return A UserDetailsService with an in-memory user.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("admin")
                                .password("{noop}12345")
                                .authorities("read")
                                .roles("USER")
                                .build();

        return new InMemoryUserDetailsManager(user);
    }

    /**
     * Provides a JWKSource for JWT key set.
     *
     * @return A JWKSource for JWT key set.
     */
    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        JWKSet jwkSet = new JWKSet(rsaKey());
        return (((jwkSelector, securityContext) 
                        -> jwkSelector.select(jwkSet)));
    }

    /**
     * Provides a JwtEncoder for encoding JWT tokens.
     *
     * @param jwkSource : The JWKSource for JWT key set.
     * @return A JwtEncoder for encoding JWT tokens.
     */
    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

    /**
     * Provides a JwtDecoder for decoding JWT tokens.
     *
     * @return A JwtDecoder for decoding JWT tokens.
     * @throws JOSEException if an error occurs during the construction of the decoder.
     */
    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
        return NimbusJwtDecoder
                .withPublicKey(rsaKey().toRSAPublicKey())
                .build();
    }
    
    /**
     * Provides an RSAKey for signing and verifying JWT tokens.
     *
     * @return An RSAKey for signing and verifying JWT tokens.
     */
    @Bean
    public RSAKey rsaKey() {
        
        KeyPair keyPair = keyPair();
        
        return new RSAKey
                .Builder((RSAPublicKey) keyPair.getPublic())
                .privateKey((RSAPrivateKey) keyPair.getPrivate())
                .keyID(UUID.randomUUID().toString())
                .build();
    }

    /**
     * Generates an RSA Key Pair for JWT signing and verification.
     *
     * @return An RSA Key Pair.
     */
    @Bean
    public KeyPair keyPair() {
        try {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Unable to generate an RSA Key Pair", e);
        }
    }
    
}