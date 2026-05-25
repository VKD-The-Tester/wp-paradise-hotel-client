import { useState, useEffect } from "react";
import {
  createLocation,
  updateLocation,
  deleteLocation,
  getAdminLocations,
} from "../../../api/admin";

const AdminLocationsPage = () => {
  const [locations, setLocations] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const loadLocations = async () => {
      const data = await getAdminLocations();
      setLocations(data);
    };

    loadLocations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      city: formData.get("city"),
      address: formData.get("address"),
      description: formData.get("description"),
      rating: Number(formData.get("rating")),
      hasFreeParking: formData.get("hasFreeParking") === "on",
      hasWellnessCenter: formData.get("hasWellnessCenter") === "on",
    };

    const newLocation = await createLocation(payload);

    setLocations((prev) => [...prev, newLocation]);

    e.target.reset();
  };

  const handleEdit = async (loc) => {
    setEditingId(loc.id);
    setEditData({
      ...loc,
      hasFreeParking: !!loc.hasFreeParking,
      hasWellnessCenter: !!loc.hasWellnessCenter,
      rating: loc.rating ?? 0,
      roomCount: loc.roomCount ?? 0,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (id) => {
    const updated = await updateLocation(id, {
      ...editData,
      rating: Number(editData.rating),
      roomCount: Number(editData.roomCount),
    });

    setLocations((prev) => prev.map((loc) => (loc.id === id ? updated : loc)));

    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteLocation(id);

    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  return (
    <div>
      <h1>Admin Locations</h1>

      <form onSubmit={handleCreate}>
        <label htmlFor="name">Hotel Name:</label>
        <input name="name" id="name" placeholder="Hotel Name" />

        <label htmlFor="city">City:</label>
        <input name="city" id="city" placeholder="City" />

        <label htmlFor="address">Address:</label>
        <input name="address" id="address" placeholder="Address" />

        <label htmlFor="description">Description:</label>
        <input name="description" id="description" placeholder="Description" />

        <label htmlFor="rating">Rating:</label>
        <input type="number" name="rating" id="rating" />

        <label>
          <input type="checkbox" name="hasFreeParking" /> Free Parking
        </label>

        <label>
          <input type="checkbox" name="hasWellnessCenter" /> Wellness Center
        </label>

        <button type="submit">Add Location</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Free Parking</th>
            <th>Wellness Center</th>
            <th>Room Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.length > 0 ? (
            locations.map((loc) => (
              <tr key={loc.id}>
                <td>
                  {editingId === loc.id ? (
                    <input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.name
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      name="city"
                      value={editData.city}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.city
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      name="address"
                      value={editData.address}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.address
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.description
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      type="number"
                      name="rating"
                      value={editData.rating}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.rating
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      type="checkbox"
                      name="hasFreeParking"
                      checked={editData.hasFreeParking || false}
                      onChange={handleChange}
                    />
                  ) : loc.hasFreeParking ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      type="checkbox"
                      name="hasWellnessCenter"
                      checked={editData.hasWellnessCenter || false}
                      onChange={handleChange}
                    />
                  ) : loc.hasWellnessCenter ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <input
                      type="number"
                      name="roomCount"
                      value={editData.roomCount}
                      onChange={handleChange}
                    />
                  ) : (
                    loc.roomCount
                  )}
                </td>
                <td>
                  {editingId === loc.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdate(loc.id)}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditData({});
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleEdit(loc)}>
                        &#9998;
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(loc.id)}
                      >
                        &#10006;
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Locations Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLocationsPage;
