package com.techfix.Repo;

import org.springframework.stereotype.Repository;

import com.techfix.Model.Product;

@Repository
public interface ProductRepo extends GenericRepo<Product, Long>{

}
