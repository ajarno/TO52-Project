import React, { useState } from "react";
import { TabPanel } from "../../shared/components/TabPanel";
import { useEffectOnlyOnce } from "../../api/Utils";
import { useCategories } from "../../api/CategoriesAPI";
import AdList from "../ad/AdList";
import LandingPage from "../home/LandingPage";
import CategoryMenu from "./CategoryMenu";
import Filters from "./Filters";

export default function Search() {
  // =========================================================
  // =================== DECLARE CONSTANTS ===================
  // =========================================================
  const categories = useCategories();

  // =========================================================
  // ============ DECLARE VARIABLES AND FUNCTIONS  ===========
  // ============== RELATED TO THE TABS CHANGES ==============
  // =========================================================
  const [activeTab, setActiveTab] = useState("");

  useEffectOnlyOnce(() => {
    function initActiveTab() {
      const storedCategorySelected = sessionStorage.getItem("categorySelected");
      setActiveTab(storedCategorySelected ? storedCategorySelected : false);
    }
    initActiveTab();
  });

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    sessionStorage.setItem("categorySelected", newValue);
  };

  // =========================================================
  // ============ DECLARE VARIABLES AND FUNCTIONS  ===========
  // ============= RELATED TO THE FILTERS CHANGES ============
  // =========================================================
  const [priceFilter, setPriceFilter] = useState([0, 1500]);
  const [textFilter, setTextFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState({});

  const [filters, setFilters] = useState({});

  const updateFiltering = (
    _filters = {
      location: locationFilter,
      text: textFilter,
      price: priceFilter,
    }
  ) => {
    setFilters(_filters);
  };

  // ========================================================
  // ======================= RENDERING ======================
  // ========================================================
  return (
    <React.Fragment>
      <CategoryMenu
        categories={categories}
        activeTab={activeTab}
        handleChange={handleChange}
      />
      {activeTab === false ? (
        <LandingPage />
      ) : (
        <React.Fragment>
          <Filters
            price={priceFilter}
            onPriceChange={setPriceFilter}
            text={textFilter}
            onTextChange={setTextFilter}
            location={locationFilter}
            onLocationChange={setLocationFilter}
            onFilter={updateFiltering}
          />
          {categories &&
            categories.map((category) => {
              return (
                <TabPanel
                  key={category.slug}
                  value={activeTab}
                  index={category.slug}
                >
                  <AdList category={category.slug} filters={filters} />
                </TabPanel>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
