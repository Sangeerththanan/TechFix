package com.techfix.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.Model.User;
import com.techfix.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        String response = userService.addUser(user);
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("message", response);
        return new ResponseEntity<>(jsonResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticateUser(user.getUsername(), user.getPassword());
        Map<String, String> jsonResponse = new HashMap<>();
        
        if (isAuthenticated) {
            jsonResponse.put("message", "Login successful");
            return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
        } else {
            jsonResponse.put("message", "Invalid credentials");
            return new ResponseEntity<>(jsonResponse, HttpStatus.UNAUTHORIZED);
        }
    }
}
