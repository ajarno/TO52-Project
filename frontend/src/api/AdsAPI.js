import API from "./API";

const fetchAdsByCategory = (category) => API.get("/classifiedads?category=" + category);

const fetchAdById = (id) => API.get("/classifiedads/" + id);

export { fetchAdsByCategory, fetchAdById };