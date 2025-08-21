// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { Box, Card, CardContent, CardMedia, Typography, Button, TextField } from "@mui/material";
// import { CartContext } from "../../Context/CartContext";

// const Menu = () => {
//   const { id } = useParams(); // restaurant id
//   const [foods, setFoods] = useState([]);
//   const { addToCart } = useContext(CartContext);
//   const [quantities, setQuantities] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get(`/users/restaurants/${id}/foods`)
//       .then(res => setFoods(res.data))
//       .catch(err => console.error("Failed to fetch foods:", err));
//   }, [id]);

//   const handleAdd = (food) => {
//   const qty = quantities[food.id] || 1;
//   // spread food so it's flat with quantity
//   addToCart({ ...food, quantity: qty });
//   alert(`${qty} ${food.name} added to cart!`);
// };


//   return (
//     <Box p={3} display="flex" flexWrap="wrap" gap={2}>
//       {foods.map(food => (
//         <Card key={food.id} sx={{ width: 250 }}>
//           {food.imageUrl && <CardMedia component="img" height="140" image={food.imageUrl} alt={food.name} />}
//           <CardContent>
//             <Typography variant="h6">{food.name}</Typography>
//             <Typography variant="body2">{food.description}</Typography>
//             <Typography variant="body1">₹ {food.price}</Typography>
//             <TextField
//               type="number"
//               label="Qty"
//               value={quantities[food.id] || 1}
//               onChange={(e) => setQuantities({ ...quantities, [food.id]: parseInt(e.target.value) })}
//               size="small"
//               sx={{ width: 70, mt: 1 }}
//             />
//             <Button onClick={() => handleAdd(food)} variant="contained" sx={{ mt: 1, ml: 1 }}>
//               Add to Cart
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//       <Button variant="contained" color="primary" onClick={() => navigate("/userhome/place-order")} sx={{ mt: 2 }}>
//         Go to Cart
//       </Button>
//     </Box>
//   );
// };

// export default Menu;
import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import FoodCard from '../FoodCard';
import { CartContext } from "../../context/CartContext";



const Menu = () => {
  const [foods, setFoods] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:8080/foods")
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Our Menu
      </Typography>
      <Grid container spacing={2}>
        {foods.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <FoodCard food={food} isUser={true} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Menu;
