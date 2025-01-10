package com.example.taskmanagement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Enable CORS
                .and()
                .csrf().disable() // Disable CSRF (not recommended for production)
                .authorizeRequests()
                .antMatchers("/api/**").permitAll() // Allow all requests to /api/**
                .anyRequest().authenticated();

        return http.build();
    }
}

