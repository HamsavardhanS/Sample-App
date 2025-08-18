import api from "./api";

export const placeOrder = (order, items) =>
  api.post("/users/orders", { ...order, items });
export const getUserOrders = (userId) => api.get(`/users/orders/${userId}`);
export const getOrdersByRestaurant = (restaurantId) =>
  api.get(`/hotel/restaurants/${restaurantId}/orders`);
export const getProfitByRestaurant = (restaurantId) =>
  api.get(`/hotel/restaurants/${restaurantId}/profit`);
