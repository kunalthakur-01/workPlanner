package com.assignment.fsad.service;

import com.assignment.fsad.models.User;

import java.util.UUID;

public interface UserService {
    User signup(User user);
    User login(String email, String password);
    void deleteUserById(UUID id);
}
