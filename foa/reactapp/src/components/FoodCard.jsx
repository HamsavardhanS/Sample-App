import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const FoodCard = ({
  food,
  onAddToCart,
  onEdit,
  onDelete,
  isUser = false,
  isAdmin = false
}) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {food.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={food.imageUrl}
          alt={food.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {food.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {food.description}
        </Typography>
        <Typography variant="h6" color="primary" mt={1}>
          ₹{food.price}
        </Typography>
      </CardContent>

      {/* Action buttons */}
      {(isUser || isAdmin) && (
        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 1 }}>
          {isUser && (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => onAddToCart(food)}
            >
              Add to Cart
            </Button>
          )}
          {isAdmin && (
            <>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => onEdit(food)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => onDelete(food.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      )}
    </Card>
  );
};

export default FoodCard;
