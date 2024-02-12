import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import "../Pages/CSS/ShopCategory.css";
import { fetchData } from "../Components/api/api";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";

const ShopCategory = (props) => {
  const { fetchDataFromContext, updateContextData } = useContext(ShopContext);
  const { category } = props;
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        console.log("Category in fetchCategoryData:", category);
        console.log(
          "Before fetch - fetchDataFromContext:",
          fetchDataFromContext
        );

        // Check if data is already fetched and category is defined
        if (!dataFetched && category) {
          // Correct the function call to fetchData
          const data = await fetchData(category);
          console.log("Fetched data in ShopCategory:", data);

          // Check if data is an array before updating context
          if (Array.isArray(data)) {
            updateContextData(data);
          }

          // Set dataFetched to true to avoid refetching
          setDataFetched(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchCategoryData();
  }, [
    fetchData,
    updateContextData,
    fetchDataFromContext,
    category,
    dataFetched,
  ]);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Shopping 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="shopcategory-sort" />
        </div>
      </div>
      <div className="shopcategory-products">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {fetchDataFromContext.map((item) => (
              <Item
                key={item.product_id}
                id={item.product_id}
                imageDataUrl={item.imageDataUrl}
                name={item.name}
                price={item.price}
              />
            ))}
            {fetchDataFromContext.length === 0 && <p>No items available.</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
