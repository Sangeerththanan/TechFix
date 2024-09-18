package com.techfix.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.techfix.Model.User;
import com.techfix.Repo.UserRepo;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        // Ensure that the role does not include the "ROLE_" prefix
        String role = user.getRole().startsWith("ROLE_") ? user.getRole().substring(5) : user.getRole();

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(role) // The role should not include "ROLE_"
                .build();
    }


    public String addUser(User user) {
        String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(encodedPassword);
        repo.save(user);
        return "User added successfully";
    }

    public boolean authenticateUser(String username, String password) {
        UserDetails userDetails = loadUserByUsername(username);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, userDetails.getPassword());
    }
}
