import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../Components/api/api";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const contextData = await fetchData();
      console.log("Before fetch - fetchDataFromContext:", contextData);

      if (contextData && Array.isArray(contextData)) {
        console.log("After fetch - fetchDataFromContext:", contextData);
        console.log("ProductId:", productId);

        const foundProduct = contextData.find(
          (item) => item.product_id === Number(productId)
        );

        console.log("Found Product:", foundProduct);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Error: Product not found");
        }
      } else {
        console.error(
          "Error: Data from context is not an array or is undefined"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {product ? <Breadcrum product={product} /> : <p>Product not found</p>}
        </>
      )}
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
