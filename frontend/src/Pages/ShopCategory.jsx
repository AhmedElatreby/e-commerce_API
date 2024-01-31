import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CSS/ShopCategory.css";
import { fetchData } from "../Components/api/api";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const modifiedData = await fetchData(category || props.category);
        setData(modifiedData || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataAndSetData();
  }, [category, props.category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {data.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-product">
        {data.map((item) => (
          <Item
            key={item.product_id}
            id={item.product_id}
            name={item.name}
            price={item.price}
            imageDataUrl={item.imageDataUrl}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
