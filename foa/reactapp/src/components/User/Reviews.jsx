import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import api from "../../services/api";

const ReviewPage = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [restaurantId, setRestaurantId] = useState(""); // optional: restaurant selection
  const [foodId, setFoodId] = useState(""); // optional: food selection
  const userId = localStorage.getItem("userId");

  const handleSubmit = () => {
    if (!reviewText) return alert("Please enter a review!");

    const payload = {
      comment: reviewText,
      rating: parseInt(rating)
    };

    api.post(`/users/reviews?userId=${userId}&restaurantId=${restaurantId || ""}&foodId=${foodId || ""}`, payload)
      .then(() => {
        alert("Review added successfully!");
        setReviewText("");
        setRating(5);
        setRestaurantId("");
        setFoodId("");
      })
      .catch(err => {
        console.error("Failed to add review:", err);
        alert("Failed to add review. Try again.");
      });
  };

  return (
    <Box p={3} maxWidth={500} mx="auto">
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Add Review
      </Typography>

      <TextField
        label="Comment"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Rating"
        select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {[1, 2, 3, 4, 5].map((val) => (
          <MenuItem key={val} value={val}>
            {val} ⭐
          </MenuItem>
        ))}
      </TextField>

      {/* Optional inputs for restaurant or food review */}
      <TextField
        label="Restaurant ID (optional)"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Food ID (optional)"
        value={foodId}
        onChange={(e) => setFoodId(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewPage;
