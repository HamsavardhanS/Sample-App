import api from "./api";

// Fetch all restaurants (for App Admin home)
export const getAllRestaurants = () => api.get("/api/users/restaurants");

// Add a new restaurant (App Admin adds)
export const addRestaurant = (restaurant, hotelAdminId) =>
  api.post(`/api/admin/restaurants?hotelAdminId=${hotelAdminId}`, restaurant);

// Delete a restaurant (App Admin deletes)
export const deleteRestaurant = (id) => api.delete(`/api/admin/restaurants/${id}`);

// Fetch reviews for a specific restaurant
export const getRestaurantReviews = (restaurantId) =>
  api.get(`/api/users/reviews/restaurant/${restaurantId}`);

// Optional: Update restaurant details
export const updateRestaurant = (restaurant) =>
  api.put(`/api/admin/restaurants`, restaurant);
