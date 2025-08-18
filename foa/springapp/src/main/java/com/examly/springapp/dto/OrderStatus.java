package com.examly.springapp.dto;

import lombok.Data;

@Data
public class OrderStatus {

    private String Orderstatus;
    public String getOrderStatus() {
        return Orderstatus;
    }
    public void setOrderStatus(String status) {
        this.Orderstatus = status;
    }
}
