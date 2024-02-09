import { useState, useEffect } from "react";

export const fetchData = async (category) => {
  try {
    let url = "http://localhost:3000/products";

    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Fetched data in fetchData:", result);

    if (!Array.isArray(result)) {
      throw new Error("Data is not in the expected format");
    }

    // Convert bytea data to Blob and create a URL
    const modifiedData = result.map((item) => {
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

    return modifiedData;
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
