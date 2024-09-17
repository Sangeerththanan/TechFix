package com.techfix.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techfix.Service.GenericService;

public abstract class GenericController<T, K> {

    @Autowired
    private GenericService<T, K> service;

    // Get all entities
    @GetMapping
    public ResponseEntity<List<T>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    // Get entity by ID
    @GetMapping("{id}")
    public ResponseEntity<T> getById(@PathVariable("id") K id) {
        return new ResponseEntity<>(service.getById(id), HttpStatus.OK);
    }

    // Create a new entity
    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        return new ResponseEntity<>(service.create(entity), HttpStatus.CREATED);
    }

    // Delete an entity by ID
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") K id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
