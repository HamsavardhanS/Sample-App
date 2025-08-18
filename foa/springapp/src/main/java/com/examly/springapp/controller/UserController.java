package com.examly.springapp.controller;

import com.examly.springapp.dto.ChangePasswordRequest;
import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.LoginResponse;
import com.examly.springapp.dto.OrderRequest;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.*;
import com.examly.springapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:9001")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodOrderService orderService;

    @Autowired
    private ReviewService reviewService;

    /* ================= REGISTER ================= */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registered = userService.registerUser(user);
            String responseMsg = "User registered successfully with PhoneNumber: "
                    + registered.getPhoneNumber() + " and role: " + registered.getRole();
            return ResponseEntity.status(HttpStatus.CREATED).body(responseMsg);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* ================= LOGIN ================= */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse loginResponse = userService.login(loginRequest.getLoginId(), loginRequest.getPassword());
            return ResponseEntity.ok(loginResponse);
        } catch (UserNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    /* ================= FORGOT PASSWORD ================= */
    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ChangePasswordRequest request) {
        try {
            User updatedUser = userService.resetPassword(request.getIdentifier(), request.getNewPassword());
            return ResponseEntity.ok("Password updated successfully for user: " + updatedUser.getUsername());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /* ================= GET ALL USERS ================= */
    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /* ================= DELETE USER ================= */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable long id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    /* ================= GET ALL RESTAURANTS ================= */
    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    /* ================= GET FOODS BY RESTAURANT ================= */
    @GetMapping("/restaurants/{id}/foods")
    public ResponseEntity<List<Food>> getFoodsByRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.getFoodsByRestaurant(id));
    }

    /* ================= PLACE ORDER ================= */
    @PostMapping("/orders")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        try {
            FoodOrder placedOrder = orderService.placeOrder(request.getFoodOrder(), request.getOrderItems());
            return ResponseEntity.status(HttpStatus.CREATED).body(placedOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* ================= GET USER ORDERS ================= */
    @GetMapping("/orders")
    public ResponseEntity<List<FoodOrder>> getUserOrders(@RequestParam Long userId) {
        List<FoodOrder> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

    /* ================= ADD REVIEW ================= */
    @PostMapping("/reviews")
    public ResponseEntity<?> addReview(@RequestBody Review review,
            @RequestParam Long userId,
            @RequestParam(required = false) Long restaurantId,
            @RequestParam(required = false) Long foodId) {
        try {
            Review savedReview = reviewService.addReview(review, userId, restaurantId, foodId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* ================= GET REVIEWS ================= */
    @GetMapping("/reviews/restaurant/{restaurantId}")
    public ResponseEntity<List<Review>> getRestaurantReviews(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(reviewService.getReviewsByRestaurant(restaurantId));
    }

    @GetMapping("/reviews/food/{foodId}")
    public ResponseEntity<List<Review>> getFoodReviews(@PathVariable Long foodId) {
        return ResponseEntity.ok(reviewService.getReviewsByFood(foodId));
    }
}
