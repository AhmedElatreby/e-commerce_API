import React from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { usePopularData } from "../../api";

const NewCollections = () => {
  const { data, error } = usePopularData();

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collection">
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

export default NewCollections;