package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.model.AuthResponse;
import com.cognizant.springlearn.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/authenticate")
    public AuthResponse authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.debug("Start: authenticate()");

        String base64Credentials = authHeader.substring("Basic ".length()).trim();
        byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(decodedBytes);

        int colonIndex = credentials.indexOf(":");
        String username = credentials.substring(0, colonIndex);
        String password = credentials.substring(colonIndex + 1);

        LOGGER.debug("Authenticating user: {}", username);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            LOGGER.error("Invalid credentials for user: {}", username);
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(username);

        LOGGER.debug("End: authenticate() - token generated for user: {}", username);
        return new AuthResponse(token);
    }
}
