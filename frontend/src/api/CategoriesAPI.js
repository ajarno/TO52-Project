import API from "./API";
import { useEffectOnlyOnce } from "./Utils";
import { useState } from 'react';

const fetchCategories = () => API.get("/categories/");

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffectOnlyOnce(() => {
    const storedCategories = JSON.parse(sessionStorage.getItem("categories"));
    if (storedCategories && storedCategories.length > 0) {
      setCategories(storedCategories);
    } else {
      fetchCategories().then((_categories) => {
        setCategories(_categories.data);
        sessionStorage.setItem("categories", JSON.stringify(_categories.data));
      });
    }
  });

  return categories;
}

export { fetchCategories, useCategories };