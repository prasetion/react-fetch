import Places from './Places.jsx';
import {useState} from "react";
const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
