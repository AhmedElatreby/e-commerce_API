import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../Components/api/api";

const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [fetchDataFromContext, setFetchDataFromContext] = useState([]);
  // const [error, setError] = useState(null);

  // const fetchDataFunction = async () => {
  //   try {
  //     const data = await fetchData();
  //     setFetchDataFromContext(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(error.message);
  //   }
  // };

  const updateContextData = (data) => {
    setFetchDataFromContext(data);
  };

  // const contextValue = {
  //   fetchDataFromContext,
  //   fetchData: fetchDataFunction,
  //   error,
  //   updateContextData,
  // };

  return (
    <ShopContext.Provider value={{ fetchDataFromContext, updateContextData }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };
