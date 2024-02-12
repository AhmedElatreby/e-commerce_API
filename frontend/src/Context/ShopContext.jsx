import React, { createContext, useState } from "react";

const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [fetchDataFromContext, setFetchDataFromContext] = useState([]);

  const updateContextData = (data) => {
    setFetchDataFromContext(data);
  };

  return (
    <ShopContext.Provider value={{ fetchDataFromContext, updateContextData }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };
