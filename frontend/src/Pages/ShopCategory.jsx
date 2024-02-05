// ShopCategory.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { fetchDataFromContext, fetchData, updateContextData } =
    useContext(ShopContext);
  const { category } = props;
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        console.log(
          "Before fetch - fetchDataFromContext:",
          fetchDataFromContext
        );

        // Check if data is already fetched
        if (!dataFetched) {
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {fetchDataFromContext && fetchDataFromContext.length > 0 ? (
            fetchDataFromContext.map((item) => (
              <Item
                key={item.product_id}
                id={item.product_id}
                imageDataUrl={item.imageDataUrl}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p>No items available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShopCategory;
