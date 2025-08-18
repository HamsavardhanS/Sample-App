package com.examly.springapp.service;

import com.examly.springapp.dto.LoginResponse;
import com.examly.springapp.exception.UserAlreadyExistsException;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    

    /* ================= REGISTER ================= */
    public User registerUser(User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (user.getPhoneNumber() == null || user.getPhoneNumber().isEmpty()) {
            throw new IllegalArgumentException("Phone number cannot be empty");
        }

        // Check duplicates
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new UserAlreadyExistsException("Phone number already exists");
        }

        // Assign role based on email domain
        String email = user.getEmail().toLowerCase();
        if (email.endsWith("@admin.com")) {
            user.setRole(UserRole.APP_ADMIN);
        } else if (email.endsWith("@hotel.com")) {
            user.setRole(UserRole.HOTEL_ADMIN);
        } else {
            user.setRole(UserRole.USER);
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user in database
        return userRepository.save(user);
    }

    /* ================= LOGIN ================= */
    public LoginResponse login(String identifier, String password) {
        if (identifier == null || identifier.isEmpty()) {
            throw new IllegalArgumentException("Identifier cannot be empty");
        }

        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty())
            userOpt = userRepository.findByEmail(identifier);
        if (userOpt.isEmpty())
            userOpt = userRepository.findByPhoneNumber(identifier);

        User user = userOpt.orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        // Create empty LoginResponse and set values
        LoginResponse response = new LoginResponse();
        response.setUserId(user.getId());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());

        return response;
    }

    /* ================= FORGOT PASSWORD ================= */
    public User resetPassword(String identifier, String newPassword) {
        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty())
            userOpt = userRepository.findByPhoneNumber(identifier);

        User user = userOpt.orElseThrow(() -> new UserNotFoundException("User not found for password reset"));

        // Encode new password
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    /* ================= GET USER BY USERNAME ================= */
    public User findByUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new UserNotFoundException("Username cannot be null or empty");
        }
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
    }

    public void deleteUserById(long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
}
