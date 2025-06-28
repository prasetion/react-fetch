export async function fetchPlaces() {
    const res = await fetch('http://localhost:3000/places');
    const data = await res.json();

    if (!res.ok)
        throw new Error("failed to get places");
    return data;
}