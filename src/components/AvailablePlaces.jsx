import Places from './Places.jsx';
import {useEffect, useState} from "react";
// const places = localStorage.getItem('places');

export default function AvailablePlaces({onSelectPlace}) {
    const [availablePlaces, setAvailablePlaces] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/places').then((res) => {
                return res.json();
            }
        ).then((data) => {
            setAvailablePlaces(data.places);
        });
    }, []);

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
