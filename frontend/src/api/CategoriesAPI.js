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
      fetchCategories().then((result) => {
        const _categories = result.data;
        if (_categories.length > 0) {
          setCategories(_categories);
          sessionStorage.setItem(
            "categories",
            JSON.stringify(_categories)
          );
        }
      }).catch(e => {});
    }
  });

  return categories;
}

export { fetchCategories, useCategories };
