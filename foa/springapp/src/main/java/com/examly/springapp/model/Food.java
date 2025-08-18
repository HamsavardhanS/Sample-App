package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@Table(name="Foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String imageUrl;
    private String description;
    private Integer stock; // inventory for hotel admin

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @JsonIgnore
    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
    
    @JsonIgnore
    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<Review> reviews;
}
