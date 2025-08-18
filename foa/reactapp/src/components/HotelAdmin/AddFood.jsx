import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../../services/api";

const AddFood = ({ onFoodAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddFood = async () => {
    const adminId = localStorage.getItem("userId"); // adminId = restaurantId

    if (!name || !price) {
      alert("Name and Price are required");
      return;
    }

    if (parseFloat(price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    const newFood = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    };

    setLoading(true);
    try {
      const res = await api.post(`/hotel/foods?adminId=${adminId}`, newFood);
      if (res.status === 200 || res.status === 201) {
        alert("Food added successfully");
        if (onFoodAdded) onFoodAdded(res.data); // callback to refresh inventory
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
      }
    } catch (error) {
      console.error("Failed to add food:", error);
      alert(
        error.response?.data?.message || "Error adding food. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      padding={3}
      maxWidth={500}
      margin="auto"
      sx={{ border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Food
      </Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddFood}
        sx={{ marginTop: 2 }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Food"}
      </Button>
    </Box>
  );
};

export default AddFood;
