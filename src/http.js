export async function fetchAvailablePlaces() {
    const res = await fetch('http://localhost:3000/places');
    const data = await res.json();

    if (!res.ok)
        throw new Error("failed to get places");
    return data.places;
}

export async function fetchUserPlaces() {
    const res = await fetch('http://localhost:3000/user-places');  // Changed from /places to /user-places
    const data = await res.json();

    if (!res.ok)
        throw new Error("failed to get user places");
    return data.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();
    if (!response.ok)
        throw new Error("failed to update user places");

    return resData.message;
}