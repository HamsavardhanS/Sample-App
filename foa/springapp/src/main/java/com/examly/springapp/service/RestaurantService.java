package com.examly.springapp.service;

import com.examly.springapp.model.Restaurant;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;
import com.examly.springapp.repository.RestaurantRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private UserRepository userRepo;

    /* ================= ADD RESTAURANT ================= */
    public Restaurant addRestaurant(Restaurant restaurant, Long hotelAdminId) {
        User admin = userRepo.findById(hotelAdminId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Hotel Admin ID"));

        if (admin.getRole() != UserRole.HOTEL_ADMIN) {
            throw new IllegalArgumentException("User is not a Hotel Admin");
        }

        restaurant.setId(admin.getId()); // Force restaurant ID = hotel admin ID
        restaurant.setOwner(admin);
        return restaurantRepo.save(restaurant);
    }

    /* ================= GET ALL RESTAURANTS ================= */
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepo.findAll();
    }

    /* ================= GET RESTAURANT BY ID ================= */
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    /* ================= DELETE RESTAURANT ================= */
    public void deleteRestaurant(Long id) {
        Restaurant restaurant = getRestaurantById(id);
        restaurantRepo.delete(restaurant);
    }

    /* ================= UPDATE RESTAURANT ================= */
    public Restaurant updateRestaurant(Restaurant restaurant, Long id) {
        if (!restaurantRepo.existsById(id)) {
            throw new RuntimeException("Restaurant not found with ID: " + id);
        }
        restaurant.setId(id); // ensure ID is same
        return restaurantRepo.save(restaurant);
    }
}
