package com.techfix.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.DTO.PricingUpdateRequest;
import com.techfix.DTO.ProductPricingDTO;
import com.techfix.Model.Pricing;
import com.techfix.Service.PricingService;

@RestController
@RequestMapping("/pricing")
public class PricingController extends GenericController<Pricing, Long>{
	@Autowired
    private PricingService pricingService;

	@PutMapping("/{id}")
    public ResponseEntity<Pricing> updatePricing(@PathVariable("id") Long id, @RequestBody PricingUpdateRequest updateRequest) {
        Pricing updatedPricing = pricingService.updatePricing(id, updateRequest);
        if (updatedPricing != null) {
            return ResponseEntity.ok(updatedPricing);
        }
        return ResponseEntity.notFound().build();
    }
    
	@GetMapping("/product/{id}")
    public ResponseEntity<ProductPricingDTO> getProductPricing(@PathVariable("id") Long id) {
        ProductPricingDTO productPricingDTO = pricingService.getProductPricingDTO(id);
        if (productPricingDTO != null) {
            return ResponseEntity.ok(productPricingDTO);
        }
        return ResponseEntity.notFound().build();
    }
}
