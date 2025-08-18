package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodOrderService {

    @Autowired
    private FoodOrderRepository orderRepo;

    @Autowired
    private FoodRepository foodRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    /* ================= PLACE ORDER ================= */
    public FoodOrder placeOrder(FoodOrder order, List<OrderItem> items) {
        Restaurant restaurant = restaurantRepo.findById(order.getRestaurant().getId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        order.setRestaurant(restaurant);

        double total = 0;
        for (OrderItem item : items) {
            Food food = foodRepo.findById(item.getFood().getId())
                    .orElseThrow(() -> new RuntimeException("Food not found"));
            item.setFood(food);
            item.setOrder(order);
            item.setPrice(food.getPrice() * item.getQuantity());
            total += item.getPrice();
        }

        order.setItems(items);
        order.setTotalPrice(total);
        order.setOrderStatus("PENDING");
        FoodOrder savedOrder = orderRepo.save(order);

        for (OrderItem item : items) {
            orderItemRepo.save(item);
        }

        return savedOrder;
    }

    /* ================= GET ORDERS BY USER ================= */
    public List<FoodOrder> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    /* ================= GET ORDERS BY RESTAURANT ================= */
    public List<FoodOrder> getOrdersByRestaurant(Long restaurantId) {
        return orderRepo.findAll()
                .stream()
                .filter(o -> o.getRestaurant().getId().equals(restaurantId))
                .collect(Collectors.toList());
    }

    /* ================= UPDATE ORDER STATUS ================= */
    public FoodOrder updateOrderStatus(Long orderId, String status) {
        FoodOrder order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        return orderRepo.save(order);
    }
}
