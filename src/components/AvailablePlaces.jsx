import Places from './Places.jsx';
import {useEffect, useState} from "react";
// const places = localStorage.getItem('places');

export default function AvailablePlaces({onSelectPlace}) {
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function fetchPlaces() {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/places');
            const data = await res.json();
            setAvailablePlaces(data.places);
            setIsLoading(false);
        }

        fetchPlaces();
    }, []);

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
