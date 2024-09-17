package com.techfix.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.Model.Product;
import com.techfix.Service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController extends GenericController<Product, Long>{
	@Autowired
	private ProductService service;
	
	// Update a product (name, description)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Long id, @RequestBody Product updatedProduct) {
        try {
            Product product = service.getById(id);
            // Update only the name and description fields
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            
            service.update(id, product); // Save the updated product

            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }
}
