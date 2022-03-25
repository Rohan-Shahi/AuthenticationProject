import axios from "axios";
import React, { useState, useEffect } from "react";

const BASE_URL = "https://ecom-react-task.herokuapp.com";

export function useApi(url, method) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (data) => {
    const finalData = method === 'POST' ? data : null ;
    setIsLoading(true);
    let response;
    try{
         response = await axios({
            url: BASE_URL + url,
            method: method || "GET",
            data : finalData,
            headers: {
              "Content-Type": "application/json",
            },
          });
          setResponse(response);
          setIsLoading(false);
    }catch(err){
        setError(err);
        response = err;
        
    }
    return response;
  }

//   useEffect(() => {
//     fetchData();
//   }, [url, method, data]);

  return { response, error, isLoading, fetchData };
}
