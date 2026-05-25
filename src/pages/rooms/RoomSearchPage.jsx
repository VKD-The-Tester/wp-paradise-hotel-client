import { useActionState } from "react";
import { searchRooms } from "./actions";

const initialState = { rooms: [] };

const RoomSearchPage = () => {
  const [state, searchRoomsAction, isPending] = useActionState(
    searchRooms,
    initialState,
  );
  return (
    <div>
      <h1>Find Rooms</h1>
      <form action={searchRoomsAction}>
        <input type="date" name="checkIn" id="checkIn" />
        <input type="date" name="checkOut" id="checkOut" />

        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search rooms..."
        />

        <select name="city">
          <option value="">All Cities</option>
          <option value="Plovdiv">Plovdiv</option>
          <option value="Sofia">Sofia</option>
          <option value="Varna">Varna</option>
          <option value="Velingrad">Velingrad</option>
        </select>

        <select name="guests">
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6">6 Guests</option>
          <option value="7">7 Guests</option>
          <option value="8">8 Guests</option>
          <option value="9">9 Guests</option>
          <option value="10">10 Guests</option>
        </select>

        <select name="rating">
          <option value="">Any Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>
          <input type="checkbox" name="freeParking" id="freeParking" /> Free
          Parking
        </label>

        <label>
          <input type="checkbox" name="wellnessCenter" id="wellnessCenter" />
          Wellness Center
        </label>

        <button disabled={isPending}>
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {state?.errors && (
        <div style={{ color: "red" }}>
          {Object.values(state.errors)
            .flat()
            .map((error, index) => (
              <p key={index}>{error}</p>
            ))}
        </div>
      )}

      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>City</th>
            <th>Hotel</th>
            <th>Rating</th>
            <th>Parking</th>
            <th>Wellness</th>
          </tr>
        </thead>
        <tbody>
          {state?.rooms?.length > 0 ? (
            state.rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.capacity}</td>
                <td>{room.pricePerNight}€</td>

                <td>{room.location.city}</td>
                <td>{room.location.name}</td>
                <td>{room.location.rating}&#9733;</td>

                <td>{room.location.hasFreeParking ? "Yes" : "No"}</td>

                <td>{room.location.hasWellnessCenter ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No rooms found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomSearchPage;
