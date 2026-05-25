import { z } from "zod";

const roomSearchSchema = z.object({
  checkIn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-in date format."),
  checkOut: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-in date format."),

  guests: z.coerce.number().min(1).max(10),

  search: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  rating: z.coerce.number().min(1).max(5).optional(),

  freeParking: z.boolean().optional(),
  wellnessCenter: z.boolean().optional(),
});

export default roomSearchSchema;
