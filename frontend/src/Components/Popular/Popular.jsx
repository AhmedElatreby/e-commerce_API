import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { usePopularData, fetchData } from "../api/api_Woman";

const Popular = (props) => {
  const { error } = usePopularData();
  const [modifiedData, setModifiedData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const fetchedData = await fetchData();
        setModifiedData(fetchedData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndSetData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the data based on the category
  const filteredData = modifiedData.filter(
    (item) => item.category === props.category || item.category === undefined
  );

  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {filteredData.map((item, i) => (
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

export default Popular;
