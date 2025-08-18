package com.examly.springapp.controller;

import com.examly.springapp.model.Food;
import com.examly.springapp.model.FoodOrder;
import com.examly.springapp.service.FoodService;
import com.examly.springapp.service.FoodOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "http://localhost:9001")
public class HotelAdminController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodOrderService orderService;

    /* ================= ADD FOOD ================= */
    @PostMapping("/foods")
    public Food addFood(@RequestBody Food food, @RequestParam Long adminId) {
        // Treat adminId as restaurantId
        return foodService.addFood(food, adminId);
    }

    /* ================= UPDATE FOOD ================= */
    @PutMapping("/foods/{foodId}")
    public Food updateFood(@RequestBody Food food, @PathVariable Long foodId) {
        food.setId(foodId);
        return foodService.updateFood(food);
    }

    /* ================= DELETE FOOD ================= */
    @DeleteMapping("/foods/{foodId}")
    public String deleteFood(@PathVariable Long foodId) {
        foodService.deleteFood(foodId);
        return "Food deleted successfully";
    }

    /* ================= GET ALL FOODS FOR HOTEL ================= */
    @GetMapping("/foods")
    public List<Food> getAllFoods(@RequestParam Long adminId) {
        return foodService.getFoodsByRestaurant(adminId);
    }

    /* ================= GET ORDERS BY HOTEL ================= */
    @GetMapping("/orders")
    public List<FoodOrder> getOrders(@RequestParam Long adminId) {
        return orderService.getOrdersByRestaurant(adminId);
    }

    /* ================= CALCULATE PROFIT ================= */
    @GetMapping("/profit")
    public Double calculateProfit(@RequestParam Long adminId) {
        List<FoodOrder> orders = orderService.getOrdersByRestaurant(adminId);
        return orders.stream().mapToDouble(FoodOrder::getTotalPrice).sum();
    }
}
