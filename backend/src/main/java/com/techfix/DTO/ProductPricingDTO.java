package com.techfix.DTO;

public class ProductPricingDTO {
    private Long productId;
    private double price;

    public ProductPricingDTO(Long productId, double price) {
        this.productId = productId;
        this.price = price;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
