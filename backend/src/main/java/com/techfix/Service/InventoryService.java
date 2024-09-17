package com.techfix.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techfix.DTO.InventoryDTO;
import com.techfix.Model.Inventory;
import com.techfix.Repo.InventoryRepo;

@Service
public class InventoryService extends GenericService<Inventory, Long>{
	@Autowired
    private InventoryRepo repo;
	
	// Get all stock levels with product codes
	public List<InventoryDTO> getAllStockLevels() {
	    List<Inventory> inventories = repo.findAll();
	    return inventories.stream()
	            .map(inventory -> new InventoryDTO(inventory.getProductCode(), inventory.getStockLevel()))
	            .collect(Collectors.toList());
	}
	
    // Update stock level for a specific product
    public Inventory updateStockLevel(Long id, int newStockLevel) {
        Inventory inventory = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id: " + id));
        inventory.setStockLevel(newStockLevel);
        return repo.save(inventory);
    }
}
