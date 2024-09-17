package com.techfix.Repo;

import org.springframework.stereotype.Repository;

import com.techfix.Model.User;

@Repository
public interface UserRepo extends GenericRepo<User, Long>{
	User findByUsername(String username);
}
