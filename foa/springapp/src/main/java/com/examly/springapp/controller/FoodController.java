package com.examly.springapp.controller;

import com.examly.springapp.model.Food;
import com.examly.springapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:9001")
public class FoodController {

    @Autowired
    private FoodService foodService;

    /* ================= GET ALL FOODS ================= */
    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    /* ================= GET FOODS BY RESTAURANT ================= */
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getFoodsByRestaurant(@PathVariable Long restaurantId) {
        List<Food> foods = foodService.getFoodsByRestaurant(restaurantId);
        return ResponseEntity.ok(foods);
    }
}
