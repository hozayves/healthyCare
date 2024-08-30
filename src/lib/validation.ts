import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .min(2, "Username must be at least 2 characters.")
        .max(50, "Username must be at most 10 characters."),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), "Invalid phone number"),
    // password: z.string()
    //     .min(8, "Password must be between 8 and 12 chars")
    //     .max(12, "Password must be between 8 and 12 chars")
})