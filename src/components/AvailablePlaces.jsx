import Places from './Places.jsx';
import Error from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";
import {useFetch} from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
    const places = await fetchAvailablePlaces();
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const sortedPlaces = sortPlacesByDistance(places, pos.coords.latitude, pos.coords.longitude);
            resolve(sortedPlaces);
        });
    })
}


export default function AvailablePlaces({onSelectPlace}) {

    const {
        error,
        isFetching,
        fetchedData: availablePlaces,
    } = useFetch(fetchSortedPlaces, []);


    if (error) {
        return <Error title="An error occurd" message={error.message}/>
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Loading places..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
