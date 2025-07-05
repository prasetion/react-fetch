import {useState, useEffect} from 'react';

export function useFetch(fetchFn, initialValue) {
    const [error, setError] = useState()
    const [isFetching, setIsFetching] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue)

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true)
            try {
                const places = await fetchFn();
                setFetchedData(places);
            } catch (e) {
                setError({message: e.message || "failed to get data"})
            }
            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {error, isFetching, setFetchedData, fetchedData}
}