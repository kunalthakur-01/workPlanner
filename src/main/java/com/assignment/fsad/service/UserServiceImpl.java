package com.assignment.fsad.service;

import com.assignment.fsad.exception.InternalServerException;
import com.assignment.fsad.exception.InvalidCredentialsException;
import com.assignment.fsad.exception.ResourceNotFoundException;
import com.assignment.fsad.models.User;
import com.assignment.fsad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User signup(User user) {
        User existingUser = null;
        try {
            existingUser = userRepository.findByEmail(user.getEmail());
            if(existingUser == null) {
                existingUser = userRepository.save(user);
            } else {
                    throw new ResourceNotFoundException("User already exists");
            }
        } catch (Exception e) {
            System.out.printf("Error: %s", e.getMessage());
            throw new InternalServerException(e.getMessage());
        }
        return existingUser;
    }

    @Override
    public User login(String email, String password) {
        User user = null;
        try {
            if (email != null && password != null) {
                user = userRepository.findByEmail(email);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new InternalServerException(e.getMessage());
        }

        if (user == null || !user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        return user;
    }

    @Override
    public void deleteUserById(UUID id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            throw new InternalServerException("Failed to delete user");
        }
    }
}
