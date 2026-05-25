import { getAvailableRooms } from "../../api/locations";
import roomSearchSchema from "../../schemas/roomSearchSchema";

export const searchRooms = async (prevState, formData) => {
  const rawData = Object.fromEntries(formData);

  const formattedData = {
    ...rawData,
    freeParking: formData.get("freeParking") === "on",
    wellnessCenter: formData.get("wellnessCenter") === "on",
  };

  const result = await roomSearchSchema.safeParseAsync(formattedData);

  if (!result.success) {
    return { rooms: [], errors: result.error.flatten().fieldErrors };
  }

  try {
    const rooms = await getAvailableRooms(result.data);
    return { rooms };
  } catch {
    return { rooms: [], errors: { api: ["Failed to fetch rooms"] } };
  }
};
