import { useEffect, useState } from "react";

const useFetch = url => {
	const [dataApi, setDataApi] = useState([])
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => setDataApi(data.results))
	}, [url])
	return dataApi
}

export default useFetch;
