import Places from './Places.jsx';
import {useEffect, useState} from "react";
import Error from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({onSelectPlace}) {
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        async function fetchPlaces() {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:3000/places');
                const data = await res.json();

                if (!res.ok)
                    throw new Error("failed to get places");

                navigator.geolocation.getCurrentPosition((pos) => {
                    const sortedPlaces = sortPlacesByDistance(data.places, pos.coords.latitude, pos.coords.longitude);
                    setAvailablePlaces(sortedPlaces);
                    setIsLoading(false);
                });

            } catch (error) {
                setError({
                    message: error.message || "Could not fetch places."
                });
                setIsLoading(false);
            }
        }

        fetchPlaces();
    }, []);

    if (error) {
        return <Error title="An error occurd" message={error.message}/>
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isLoading}
            loadingText="Loading places..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
