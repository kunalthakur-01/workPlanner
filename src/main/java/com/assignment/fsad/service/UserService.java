package com.assignment.fsad.service;

import com.assignment.fsad.models.User;

public interface UserService {
    User signup(User user);
    User login(String email, String password);
}
