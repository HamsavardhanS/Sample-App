import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
});

export default api;


// USER API calls
export const getRestaurants = () => api.get("/admin/restaurants");
export const getRestaurantFoods = (restaurantId) => api.get(`/foods/restaurant/${restaurantId}`);
export const getUserOrders = (userId) => api.get(`/user/orders?userId=${userId}`);
export const placeOrder = (order) => api.post("/user/orders", order);
export const getReviews = (restaurantId) => api.get(`/admin/restaurants/${restaurantId}/reviews`);
export const submitReview = (review) => api.post("/user/reviews", review);
