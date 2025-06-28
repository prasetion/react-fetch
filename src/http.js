export async function fetchAvailablePlaces() {
    const res = await fetch('http://localhost:3000/places');
    const data = await res.json();

    if (!res.ok)
        throw new Error("failed to get places");
    return data.places;
}

export async function updateUserPlaces(places) {
    const response = fetch('http://localhost:3000/user-placess', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();
    if (!resData.ok)
        throw new Error("failed to update user places");

    return resData.message;
}