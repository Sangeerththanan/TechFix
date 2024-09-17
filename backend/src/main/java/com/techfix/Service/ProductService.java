package com.techfix.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techfix.Model.Product;
import com.techfix.Repo.ProductRepo;

@Service
public class ProductService extends GenericService<Product, Long>{
	@Autowired
	private ProductRepo repo;
	
	public String update(Long id, Product updatedProduct) {
	    if (!repo.existsById(id)) {
	        return "Element not found";
	    }

	    // Update the product with new details
	    Product existingProduct = repo.findById(id).orElse(null);
	    if (existingProduct != null) {
	        existingProduct.setName(updatedProduct.getName());
	        existingProduct.setDescription(updatedProduct.getDescription());
	        repo.save(existingProduct);
	        return "Updated Successfully";
	    }

	    return "Element not found";
	}
}
