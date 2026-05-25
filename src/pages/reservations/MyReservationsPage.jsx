import { useEffect, useState } from "react";
import {
  cancelReservation,
  createReservation,
  getMyReservations,
} from "../../api/reservations";

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      const data = await getMyReservations();
      setReservations(data);
    };
    loadReservations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      roomId: formData.get("roomId"),
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
      guests: Number(formData.get("guests")),
    };

    const newReservation = await createReservation(payload);

    setReservations((prev) => [...prev, newReservation]);

    e.target.reset();
  };

  const handleCancellation = async (id) => {
    await cancelReservation(id);

    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  return (
    <div>
      <h1>My Reservations</h1>

      <form onSubmit={handleCreate}>
        <input type="hidden" name="roomId" />

        <label htmlFor="checkIn">Check In</label>
        <input type="date" name="checkIn" id="checkIn" />

        <label htmlFor="checkOut">Check Out</label>
        <input type="date" name="checkOut" id="checkOut" />

        <label htmlFor="guests">Guests</label>
        <input type="number" name="guests" id="guests" />

        <button type="submit">Create Reservation</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Location Name</th>
            <th>Location City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.checkIn}</td>
                <td>{reservation.checkOut}</td>
                <td>{reservation.guests}</td>
                <td>{reservation.status}</td>
                <td>{reservation.roomName}</td>
                <td>{reservation.roomType}</td>
                <td>{reservation.locationName}</td>
                <td>{reservation.locationCity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleCancellation(reservation.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <td>No reservations found</td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservationsPage;
