import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products"); // Update the URL
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {data.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.product_id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
