package com.techfix.DTO;

public class InventoryDTO {
    private String productCode;
    private int stockLevel;

    public InventoryDTO(String productCode, int stockLevel) {
        this.productCode = productCode;
        this.stockLevel = stockLevel;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public int getStockLevel() {
        return stockLevel;
    }

    public void setStockLevel(int stockLevel) {
        this.stockLevel = stockLevel;
    }
}
