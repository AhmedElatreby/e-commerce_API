import React, { useContext, useEffect, useState } from "react";
import "./RelatedProducts.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../../Components/Item/Item";
import { fetchData } from "../../Components/api/api";

const RelatedProducts = (props) => {
  const { fetchDataFromContext, updateContextData } = useContext(ShopContext);
  const { category } = props;
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Check if data is already fetched and category is defined
        if (!dataFetched && category) {
          // Correct the function call to fetchData
          const data = await fetchData(category);
          // Check if data is an array before updating context
          if (Array.isArray(data)) {
            updateContextData(data);
          }

          // Set dataFetched to true to avoid refetching
          setDataFetched(true);
        }

        setLoading(false);
      } catch (error) {
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
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {fetchDataFromContext.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.product_id}
              imageDataUrl={item.imageDataUrl}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
