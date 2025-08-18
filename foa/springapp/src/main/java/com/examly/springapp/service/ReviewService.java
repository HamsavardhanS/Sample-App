package com.examly.springapp.service;

import com.examly.springapp.model.Review;
import com.examly.springapp.model.Food;
import com.examly.springapp.model.Restaurant;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ReviewRepository;
import com.examly.springapp.repository.FoodRepository;
import com.examly.springapp.repository.RestaurantRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private FoodRepository foodRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private UserRepository userRepo;

    /* ================= ADD REVIEW ================= */
    public Review addReview(Review review, Long userId, Long restaurantId, Long foodId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        review.setUser(user);

        if(restaurantId != null) {
            Restaurant restaurant = restaurantRepo.findById(restaurantId)
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            review.setRestaurant(restaurant);
        }

        if(foodId != null) {
            Food food = foodRepo.findById(foodId).orElseThrow(() -> new RuntimeException("Food not found"));
            review.setFood(food);
        }

        return reviewRepo.save(review);
    }

    /* ================= GET REVIEWS BY RESTAURANT ================= */
    public List<Review> getReviewsByRestaurant(Long restaurantId) {
        return reviewRepo.findByRestaurantId(restaurantId);
    }

    /* ================= GET REVIEWS BY FOOD ================= */
    public List<Review> getReviewsByFood(Long foodId) {
        return reviewRepo.findByFoodId(foodId);
    }
}
