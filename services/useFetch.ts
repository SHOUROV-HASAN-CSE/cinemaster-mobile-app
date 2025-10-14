import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) =>{

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 


const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const result = await fetchFunction();
    setData(result)
    const data = await fetchFunction();
    setData(data);
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};


const reset = () => {
  setData(null);
  setError(null);
  setLoading(false);
};

useEffect(() => {
  if (autoFetch) {
    fetchData();
  }
}, []);


return { data, loading, error, refetch: fetchData, reset };


}


export default useFetch;