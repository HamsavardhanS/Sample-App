package com.examly.springapp.repository;
import com.examly.springapp.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
    // Additional query methods can be defined here if needed

}
