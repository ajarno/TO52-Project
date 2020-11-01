import API from "./API";

const fetchAdsByCategory = (category) => API.get("/ads?category=" + category);

export { fetchAdsByCategory };