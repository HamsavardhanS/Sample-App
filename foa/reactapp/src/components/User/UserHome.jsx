import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/users/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error("Failed to fetch restaurants:", err));
  }, []);

  return (
    <Box p={3} display="flex" flexWrap="wrap" gap={2}>
      {restaurants.map((r) => (
        <Card key={r.id} sx={{ width: 250 }}>
          {r.imageUrl && <CardMedia component="img" height="140" image={r.imageUrl} alt={r.name} />}
          <CardContent>
            <Typography variant="h6">{r.name}</Typography>
            <Typography variant="body2">{r.address}</Typography>
            <Button onClick={() => navigate(`/userhome/restaurant/${r.id}/menu`)} variant="contained" sx={{ mt: 1 }}>
              View Menu
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UserHome;
