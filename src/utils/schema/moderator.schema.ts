// utils/schema/moderator.schema.ts
import { z } from "zod";

export const moderatorSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type ModeratorFormValues = z.infer<typeof moderatorSchema>;
