import React, { useEffect, useState } from "react";
import { getAllRestaurants, getRestaurantReviews } from "../../services/adminapi";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";

const Feedbacks = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    getAllRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const handleViewReviews = (id) => {
    getRestaurantReviews(id)
      .then((res) => {
        setReviews((prev) => ({ ...prev, [id]: res.data }));
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" mb={3} fontWeight="bold">
        Restaurant Feedbacks
      </Typography>

      {restaurants.map((r) => (
        <Card key={r.id} className="mb-3 shadow-md" sx={{ display: "flex", mb: 2 }}>
          {r.imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 140 }}
              image={r.imageUrl}
              alt={r.name}
            />
          )}
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{r.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {r.location}
            </Typography>
            <Button
              onClick={() => handleViewReviews(r.id)}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              View Reviews
            </Button>
            {reviews[r.id] && (
              <Box mt={2}>
                {reviews[r.id].length > 0 ? (
                  reviews[r.id].map((rev) => (
                    <Typography key={rev.id} variant="body2">
                      ⭐ {rev.rating} - {rev.comment}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No reviews yet</Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Feedbacks;
