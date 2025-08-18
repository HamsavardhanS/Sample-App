package com.examly.springapp.dto;

import com.examly.springapp.model.UserRole;

public class LoginResponse {
    private long userId;
    private String username;
    private UserRole role;
   


    // Getters and setters
    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    
}
