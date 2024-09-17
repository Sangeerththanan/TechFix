package com.techfix.Repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.techfix.DTO.ProductPricingDTO;
import com.techfix.Model.Pricing;

@Repository
public interface PricingRepo extends GenericRepo<Pricing, Long> {
    @Query("SELECT new com.techfix.DTO.ProductPricingDTO(p.product.id, p.price) FROM Pricing p WHERE p.product.id = ?1")
    public ProductPricingDTO getPriceByProductId(Long productId);
}
