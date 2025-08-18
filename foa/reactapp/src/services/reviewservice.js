import api from "./api";

export const addReview = (review, userId, restaurantId, foodId) =>
  api.post(
    `/users/reviews?userId=${userId}&restaurantId=${restaurantId || ""}&foodId=${foodId || ""}`,
    review
  );

export const getRestaurantReviews = (restaurantId) =>
  api.get(`/users/reviews/restaurant/${restaurantId}`);

export const getFoodReviews = (foodId) =>
  api.get(`/users/reviews/food/${foodId}`);
