import API from "./API";

const fetchCategories = () => API.get("/categories/");

export { fetchCategories };