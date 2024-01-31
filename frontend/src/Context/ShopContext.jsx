import React, { createContext } from "react";
import { fetchData, usePopularData } from "../Components/api/api";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const contextValue = { fetchData, usePopularData };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
