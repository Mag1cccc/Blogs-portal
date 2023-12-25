import React, { useState, useEffect } from "react";
import axios from "axios";
import arrowDown from "../src/assets/arrow-down.svg";

export const CategoriesDropdown = ({ validateCategories }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategoryColors, setSelectedCategoryColors] = useState({});
  const [borderColor, setBorderColor] = useState("default");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("https://api.blog.redberryinternship.ge/api/categories")
      .then((response) => {
        const responseData = response?.data?.data;

        if (Array.isArray(responseData)) {
          setCategories(responseData);
        } else {
          console.error("Categories data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  };

  const getBorderColor = () => {
    if (showCategories && selectedCategories.length > 0) {
      setBorderColor("green");
    } else if (showCategories && selectedCategories.length === 0) {
      setBorderColor("red");
    } else if (!showCategories) {
      return borderColor;
    }
  };

  const handleCategoryChange = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId);

    let updatedSelectedCategories;
    let updatedCategoryColors = { ...selectedCategoryColors };

    if (!isSelected) {
      updatedSelectedCategories = [...selectedCategories, categoryId];
      const selectedCategory = categories.find(
        (category) => category.id === categoryId
      );
      if (selectedCategory) {
        updatedCategoryColors = {
          ...selectedCategoryColors,
          [categoryId]: {
            text_color: selectedCategory.text_color,
            background_color: selectedCategory.background_color,
          },
        };
      }
    } else {
      updatedSelectedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      const { [categoryId]: removedColor, ...restColors } =
        selectedCategoryColors;
      updatedCategoryColors = restColors;
    }

    setSelectedCategories(updatedSelectedCategories);
    setSelectedCategoryColors(updatedCategoryColors);

    validateCategories(updatedSelectedCategories);
  };

  const toggleShowCategories = () => {
    if (!showCategories && selectedCategories.length === 0) {
      setBorderColor("red");
    } else if (showCategories || selectedCategories.length > 0) {
      setBorderColor("green");
    } else {
      setBorderColor("default");
    }
    setShowCategories(!showCategories);
  };

  const removeCategory = (categoryIdToRemove) => {
    const updatedSelectedCategories = selectedCategories.filter(
      (categoryId) => categoryId !== categoryIdToRemove
    );
    setSelectedCategories(updatedSelectedCategories);

    const isButtonDisabled = updatedSelectedCategories.length === 0;
    const borderColor = isButtonDisabled ? "red" : "green";
    setBorderColor(borderColor);
    validateCategories(updatedSelectedCategories);
  };

  const selectedCategoryTitles = selectedCategories.map((id) => {
    const selected = categories.find((category) => category.id === id);
    return selected ? selected.title : "";
  });

  return (
    <div className={`categories-dropdown ${borderColor}`}>
      <div className="selected-categories-container">
        {selectedCategories.map((id) => {
          const category = categories.find((c) => c.id === id);
          return (
            <div
              key={id}
              className="selected-category"
              style={{
                color: selectedCategoryColors[id]?.text_color || "",
                backgroundColor:
                  selectedCategoryColors[id]?.background_color || "",
              }}
            >
              {category?.title}
              <span className="close-icon" onClick={() => removeCategory(id)}>
                &#10005;
              </span>
            </div>
          );
        })}
      </div>
      <button onClick={toggleShowCategories} className="toggle-button">
        <img src={arrowDown} alt="arrow down" />
      </button>
      {showCategories && (
        <div className="categories-list">
          {categories.map((category) => (
            <label key={category.id} className="category-label">
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="category-checkbox"
              />
              <span className="category-title">{category.title}</span>
              <br />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
