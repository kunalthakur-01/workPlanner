package com.assignment.fsad.service;

import com.assignment.fsad.exception.InternalServerException;
import com.assignment.fsad.exception.InvalidCredentialsException;
import com.assignment.fsad.exception.ResourceNotFoundException;
import com.assignment.fsad.models.User;
import com.assignment.fsad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User signup(User user) {
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        User user = null;
        try {
            if (email != null && password != null) {
                user = userRepository.findByEmail(email);
            }
        } catch (Exception e) {
            throw new InternalServerException(e.getMessage());
        }

        if (user == null || !user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        return user;
    }
}
