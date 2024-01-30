import { useState, useEffect } from "react";

export const fetchData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/products?category=woman"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();

    // Convert bytea data to Blob and create a URL
    return result.map((item) => {
      if (item.image && item.image.data) {
        const byteCharacters = new Uint8Array(item.image.data);
        const blob = new Blob([byteCharacters], { type: "image/png" });
        const imageDataUrl = URL.createObjectURL(blob);

        return {
          ...item,
          imageDataUrl,
        };
      } else {
        return item;
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const usePopularData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const modifiedData = await fetchData();
        setData(modifiedData || []); // Ensure data is initialized as an array
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataAndSetData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return { data, error };
};
