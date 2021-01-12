import API from "./API";
import { useEffectOnlyOnce } from "./Utils";
import { useState } from "react";

const fetchCategories = () => API.get("/categories/");

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffectOnlyOnce(() => {
    const storedCategories = JSON.parse(sessionStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      fetchCategories()
        .then((result) => {
          const _categories = result.data;
          if (_categories.length > 0) {
            sessionStorage.setItem("categories", JSON.stringify(_categories));
            setCategories(_categories);
          }
        })
        .catch((e) => {});
    }
  });

  return categories;
}

function refreshCategories() {
  fetchCategories()
    .then((result) => {
      const _categories = result.data;
      if (_categories.length > 0) {
        sessionStorage.setItem("categories", JSON.stringify(_categories));
        return _categories;
      }
    })
    .catch((e) => {});
}

export { fetchCategories, useCategories, refreshCategories };
