package com.techfix.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.techfix.Repo.GenericRepo;


public class GenericService<T, K> {

    @Autowired
    private GenericRepo<T, K> repo;

    public List<T> getAll() {
        return repo.findAll();
    }

    public T getById(K id) {
        Optional<T> entity = repo.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        } else {
            // Handle entity not found case
            throw new RuntimeException("Entity not found with id: " + id);
        }
    }

    public T create(T entity) {
        return repo.save(entity);
    }

    public void deleteById(K id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            // Handle entity not found case
            throw new RuntimeException("Entity not found with id: " + id);
        }
    }
}
