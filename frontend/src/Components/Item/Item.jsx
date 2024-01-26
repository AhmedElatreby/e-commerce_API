import React from "react";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="item">
      <img src={props.imageDataUrl} alt={props.name} />
      <div className="item-details">
        <p> {props.name}</p>
        <div className="item-price">£{props.price}</div>
      </div>
    </div>
  );
};

export default Item;
