import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;
  if (!product) {
    return null;
  }
  return (
    <div className="Breadcrum">
      HOME <img src={arrow_icon} alt="item" />
      SHOP <img src={arrow_icon} alt="item" />
      {product.category}
      <img src={arrow_icon} alt="item" />
      {product.name}
    </div>
  );
};

export default Breadcrum;
