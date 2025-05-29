package com.assignment.fsad.controller;

import com.assignment.fsad.models.User;
import com.assignment.fsad.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/user/auth")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.signup(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, Object> body) {
        System.out.printf("Login request received: %s\n", body);
        String email = (String) body.get("email");
        String password = (String) body.get("password");
        if (email == null || password == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.login(email, password));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") UUID userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.noContent().build();
    }
}
