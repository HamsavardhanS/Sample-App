import api from "./api";

// export const addFood = (food, restaurantId) =>
//   //api.post(`/api/hotel/foods?restaurantId=${restaurantId}`, food);
//   api.post(`/api/hotel/foods/${restaurantId}`, food);
export const addFood = (food, restaurantId) =>
  api.post(`/api/hotel/foods?restaurantId=${restaurantId}`, food);

export const getFoodsByRestaurant = (restaurantId) =>
  api.get(`/api/foods?restaurantId=${restaurantId}`);

export const updateFood = (food) =>
  api.put(`/api/foods`, food);

export const deleteFood = (foodId) =>
  api.delete(`/api/foods/${foodId}`);

