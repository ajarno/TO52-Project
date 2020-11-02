import API from "./API";

const fetchAdsByCategory = (category) => API.get("/ads?category=" + category);

const fetchAdById = (id) => API.get("/ads/" + id);

export { fetchAdsByCategory, fetchAdById };