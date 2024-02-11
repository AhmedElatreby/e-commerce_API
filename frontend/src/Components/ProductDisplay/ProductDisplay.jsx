import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.imageDataUrl} />
          <img src={product.imageDataUrl} />
          <img src={product.imageDataUrl} />
          <img src={product.imageDataUrl} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.imageDataUrl} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="star_icon" />
          <img src={star_icon} alt="star_icon" />
          <img src={star_icon} alt="star_icon" />
          <img src={star_icon} alt="star_icon" />
          <img src={star_dull_icon} alt="star_dull_icon" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-price">£{product.price}</div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>
          {product.name}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
