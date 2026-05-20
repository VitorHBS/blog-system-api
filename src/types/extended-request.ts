import type { User } from "@prisma/client";
import type { Request } from "express";

type UserWithoutPassword = Omit<User, "password">;

export type ExtendedRequest = Request & {
    user?: UserWithoutPassword;
}