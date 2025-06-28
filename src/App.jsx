import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchUserPlaces, updateUserPlaces} from "./http.js";
import Error from "./components/Error.jsx";

function App() {
    const selectedPlace = useRef();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState()
    const [userPlaces, setUserPlaces] = useState([]);
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true)
            try {
                const places = await fetchUserPlaces();
                setUserPlaces(places);
            } catch (e) {
                setError({message: e.message || "error get user places"})
            }
            setIsFetching(false);
        }

        fetchPlaces();
    }, [])

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            const updateUser = await updateUserPlaces([selectedPlace, ...userPlaces])
        } catch (e) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({message: e.message || "failed update user place"});
        }
    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );

        try {
            const deletePlace = await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
        } catch (e) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: e.message || "failed to delete place"
            })
        }

        setModalIsOpen(false);
    }, []);

    function handleError() {
        setErrorUpdatingPlaces(null)
    }

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={handleError}>
                {errorUpdatingPlaces &&
                    <Error title="An Error Occurd" message={errorUpdatingPlaces.message} onConfirm={handleError}/>}
            </Modal>

            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                {error && <Error title="Error occured" message={error.message}/>}
                {!error && <Places
                    title="I'd like to visit ..."
                    fallbackText="Select the places you would like to visit below."
                    isLoading={isFetching}
                    loadingText="Loading places..."
                    places={userPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                }
                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
