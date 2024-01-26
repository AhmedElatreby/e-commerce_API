import React from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { usePopularData } from "../../api";

const Popular = () => {
  const { data, error } = usePopularData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {data.map(({ product_id, name, price, imageDataUrl }, i) => (
          <Item
            key={i}
            id={product_id}
            name={name}
            price={price}
            imageDataUrl={imageDataUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
