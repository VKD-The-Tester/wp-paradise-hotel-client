import { useEffect, useState } from "react";
import { getAllReservations } from "../../../api/admin";

const AdminReservationsPage = () => {
  const [table, setTable] = useState({ reservations: [] });
  useEffect(() => {
    const loadReservations = async () => {
      const data = await getAllReservations();
      setTable(data);
    };
    loadReservations();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Room Name</th>
            <th>Location Name</th>
            <th>Location City</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Guests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {table.reservations.length > 0 ? (
            table.reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.guestName}</td>
                <td>{reservation.guestEmail}</td>
                <td>{reservation.roomName}</td>
                <td>{reservation.locationName}</td>
                <td>{reservation.locationCity}</td>
                <td>{reservation.checkIn}</td>
                <td>{reservation.checkOut}</td>
                <td>{reservation.guests}</td>
                <td>{reservation.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No reservations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservationsPage;
