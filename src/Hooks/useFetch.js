import { useEffect, useState } from "react";

export const useFetch = url => {
    const [dataApi, setDataApi] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(setDataApi)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return { dataApi, error, loading };
};

export default useFetch