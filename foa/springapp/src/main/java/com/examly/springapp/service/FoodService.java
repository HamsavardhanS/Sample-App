package com.examly.springapp.service;

import com.examly.springapp.model.Food;
import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.FoodRepository;
import com.examly.springapp.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    /* ================= ADD FOOD ================= */
    public Food addFood(Food food, Long restaurantId) {
        Restaurant restaurant = restaurantRepo.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        food.setRestaurant(restaurant);
        return foodRepo.save(food);
    }

    /* ================= UPDATE FOOD ================= */
    public Food updateFood(Food food) {
        return foodRepo.save(food);
    }

    /* ================= DELETE FOOD ================= */
    public void deleteFood(Long foodId) {
        Food food = foodRepo.findById(foodId).orElseThrow(() -> new RuntimeException("Food not found"));
        foodRepo.delete(food);
    }

    /* ================= GET ALL FOODS ================= */
    public List<Food> getAllFoods() {
        return foodRepo.findAll();
    }

    /* ================= GET FOODS BY RESTAURANT ================= */
    public List<Food> getFoodsByRestaurant(Long restaurantId) {
        return foodRepo.findAll()
                .stream()
                .filter(f -> f.getRestaurant().getId().equals(restaurantId))
                .collect(Collectors.toList());
    }
}
