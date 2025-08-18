package com.examly.springapp.controller;

import com.examly.springapp.model.Restaurant;
import com.examly.springapp.model.Review;
import com.examly.springapp.model.User;
import com.examly.springapp.service.RestaurantService;
import com.examly.springapp.service.ReviewService;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:9001")
public class AdminController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    /* ========== ADD RESTAURANT ========== */
    @PostMapping("/restaurants")
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant, @RequestParam Long hotelAdminId) {
        return restaurantService.addRestaurant(restaurant, hotelAdminId); // ID = hotelAdminId
    }

    /* ========== UPDATE RESTAURANT ========== */
    @PutMapping("/restaurants/{id}")
    public Restaurant updateRestaurant(@RequestBody Restaurant restaurant, @PathVariable Long id) {
        return restaurantService.updateRestaurant(restaurant, id);
    }

    /* ========== DELETE RESTAURANT ========== */
    @DeleteMapping("/restaurants/{id}")
    public String deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return "Restaurant deleted successfully";
    }

    /* ========== GET ALL RESTAURANTS ========== */
    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    /* ========== GET REVIEWS (only for restaurants) ========== */
    @GetMapping("/restaurants/{id}/reviews")
    public List<Review> getRestaurantReviews(@PathVariable Long id) {
        return reviewService.getReviewsByRestaurant(id);
    }

    /* ========== GET ALL USERS ========== */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
