package com.examly.springapp.dto;

import java.util.List;

import com.examly.springapp.model.FoodOrder;
import com.examly.springapp.model.OrderItem;

import lombok.Data;

@Data

public class OrderRequest {

    private FoodOrder foodOrder;
    private List<OrderItem> orderItems;
}
