import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";

const Product = () => {
  const { fetchDataFromContext, updateContextData, fetchData } =
    useContext(ShopContext);
  const { productId } = useParams();
  console.log("ProductId:", productId);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const fetchProductData = async () => {
    try {
      console.log("Before fetch - fetchDataFromContext:", fetchDataFromContext);

      // Fetch data only if the specific product is not available in context
      if (
        !fetchDataFromContext.some(
          (item) => item.product_id === Number(productId)
        )
      ) {
        const data = await fetchData();
        console.log("Fetched data in Product:", data);

        // Check if data is an array before updating context
        if (data && Array.isArray(data)) {
          // Update context only once after fetching the data
          updateContextData(data);

          // Find and set the product based on the productId
          const foundProduct = data.find(
            (item) => item.product_id === Number(productId)
          );

          setProduct(foundProduct);
          setLoading(false);
        } else {
          // Handle the case where fetching data fails
          console.error(
            "Error fetching data: Data is not an array or is undefined"
          );
          setLoading(false);
          return;
        }
      } else {
        // If the product is already in context, set it directly
        const foundProduct = fetchDataFromContext.find(
          (item) => item.product_id === Number(productId)
        );
        setProduct(foundProduct);
        setLoading(false);
      }

      console.log("After fetch - fetchDataFromContext:", fetchDataFromContext);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [fetchData, updateContextData, fetchDataFromContext, productId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {product ? <Breadcrum product={product} /> : <p>Product not found</p>}
        </>
      )}
    </div>
  );
};

export default Product;
