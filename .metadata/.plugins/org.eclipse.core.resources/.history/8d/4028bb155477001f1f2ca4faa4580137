package com.techfix.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.DTO.InventoryDTO;
import com.techfix.Model.Inventory;
import com.techfix.Service.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController extends GenericController<Inventory, Long>{
	@Autowired
	private InventoryService service;
	
	@GetMapping("/stock")
    public List<InventoryDTO> getAllStockLevels() {
        return service.getAllStockLevels();
    }
	
	@PutMapping("/stock/{id}")
	public ResponseEntity<Inventory> updateStockLevel(@PathVariable("id") Long id, @RequestBody Map<String, Integer> requestBody) {
	    Integer stockLevel = requestBody.get("stockLevel");
	    if (stockLevel == null) {
	        return ResponseEntity.badRequest().build(); // Return 400 Bad Request if stockLevel is missing
	    }
	    Inventory updatedInventory = service.updateStockLevel(id, stockLevel);
	    return ResponseEntity.ok(updatedInventory);
	}

}
