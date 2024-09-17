package com.techfix.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techfix.DTO.PricingUpdateRequest;
import com.techfix.DTO.ProductPricingDTO;
import com.techfix.Model.Pricing;
import com.techfix.Repo.PricingRepo;

@Service
public class PricingService extends GenericService<Pricing, Long>{
	@Autowired
    private PricingRepo pricingRepo;

	public Pricing updatePricing(Long id, PricingUpdateRequest pricingUpdateRequest) {
        Optional<Pricing> pricingOptional = pricingRepo.findById(id);
        if (pricingOptional.isPresent()) {
            Pricing pricing = pricingOptional.get();
            pricing.setPrice(pricingUpdateRequest.getPrice());
            pricing.setDiscount(pricingUpdateRequest.getDiscount());
            pricing.setLastUpdated(pricingUpdateRequest.getLastUpdated());
            return pricingRepo.save(pricing);
        }
        return null;
    }

	public ProductPricingDTO getProductPricingDTO(Long productId) {
        return pricingRepo.getPriceByProductId(productId);
    }

}
