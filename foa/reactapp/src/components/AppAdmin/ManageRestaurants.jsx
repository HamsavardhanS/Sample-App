import React, { useEffect, useState } from "react";
import { getAllRestaurants, deleteRestaurant, updateRestaurant } from "../../services/adminapi";
import { Card, CardContent, CardMedia, Button, TextField, Box, Typography } from "@mui/material";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ name: "", location: "", imageUrl: "" });

  const fetchRestaurants = () => {
    getAllRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = (id) => {
    deleteRestaurant(id).then(fetchRestaurants);
  };

  const handleUpdate = (id) => {
    updateRestaurant(id, editData).then(() => {
      setEditMode(null);
      fetchRestaurants();
    });
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" mb={3} fontWeight="bold">
        Manage Restaurants
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
            {editMode === r.id ? (
              <Box>
                <TextField
                  label="Name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Location"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Image URL"
                  value={editData.imageUrl}
                  onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button onClick={() => handleUpdate(r.id)} variant="contained" color="success" sx={{ mr: 1 }}>
                  Save
                </Button>
                <Button onClick={() => setEditMode(null)} variant="outlined" color="error">
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6">{r.name}</Typography>
                <Typography variant="body2" color="text.secondary">{r.location}</Typography>
                <Box mt={2}>
                  <Button
                    onClick={() => { setEditMode(r.id); setEditData(r); }}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(r.id)} variant="contained" color="error">
                    Delete
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ManageRestaurants;
