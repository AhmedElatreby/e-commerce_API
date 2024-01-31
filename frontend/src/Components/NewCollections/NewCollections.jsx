import React from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { usePopularData } from "../../Components/api/api";

const NewCollections = () => {
  const { data } = usePopularData();

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {data.map((item, i) => (
          <Item
            key={i}
            id={item.product_id}
            name={item.name}
            price={item.price}
            imageDataUrl={item.imageDataUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
