import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { fetchData } from "../../Components/api/api";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { fetchDataFromContext, updateContextData } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const { product, category } = props;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        console.log("Category in fetchCategoryData:", category);
        console.log(
          "Before fetch - fetchDataFromContext:",
          fetchDataFromContext
        );

        // Check if data is already fetched
        if (!dataFetched) {
          // Correct the function call to fetchData
          const data = await fetchData(category);
          console.log("Fetched data in ShopCategory:", data);

          // Check if data is an array before updating context
          if (Array.isArray(data)) {
            updateContextData(data);
            console.log(
              "After update - fetchDataFromContext:",
              fetchDataFromContext
            );
          }

          // Set dataFetched to true to avoid refetching
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set loading to false in case of an error
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

  // Log product data
  console.log("Product Data:", product);

  if (!product) {
    return null;
  }

  // Log category data
  console.log("Category:", product.category);

  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="item" />
      SHOP <img src={arrow_icon} alt="item" />
      {/* {category} */}
      {/* <img src={arrow_icon} alt="item" /> */}
      {product.name}
    </div>
  );
};

export default Breadcrum;
