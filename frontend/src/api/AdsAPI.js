import API from "./API";

const fetchAdsByCategory = (category) => API.get("/classifiedads?category=" + category);

const fetchAdById = (id) => API.get("/classifiedads/" + id);

const postAd = () => API.post("/classifiedads/");

export { fetchAdsByCategory, fetchAdById, postAd };