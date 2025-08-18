import api from "./api";

/* ================= USERS ================= */
export const getAllUsers = () => api.get("/admin/users");

/* ================= RESTAURANTS ================= */
export const getAllRestaurants = () => api.get("/admin/restaurants");
export const addRestaurant = (restaurant,hotelAdminId) => {
  return api.post(`/admin/restaurants?hotelAdminId=${hotelAdminId}`, restaurant);
};

export const deleteRestaurant = (id) => api.delete(`/admin/restaurants/${id}`);
export const updateRestaurant = (id, updatedData) =>
  api.put(`/admin/restaurants/${id}`, updatedData);

/* ================= REVIEWS ================= */
export const getRestaurantReviews = (restaurantId) =>
  api.get(`/admin/restaurants/${restaurantId}/reviews`);
