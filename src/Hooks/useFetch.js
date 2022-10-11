import { useEffect} from "react";
import { useFetchContext, useSetFetchContext } from '../providers/SidebarProvider'
const useFetch = url => {
	// Datos traídos del estado global de la app, componente SidebarProvider
	const dataApi = useFetchContext()
	const setDataApi = useSetFetchContext()

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => setDataApi(data))
			console.log(dataApi)
	}, [url])
}

export default useFetch;
