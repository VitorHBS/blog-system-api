import bcrypt from "bcryptjs";
import { prisma } from "../libs/prisma";
import type { LoginData } from "../schemas/user";
import { email } from "zod";
import { tr } from "zod/v4/locales/index.js";

type CreateUserPros = {
    name: string,
    email: string,
    password: string
}

export const createUser = async ({ name, email, password }: CreateUserPros) => {
    email = email.toLocaleLowerCase();

    const user = await prisma.user.findFirst({
        where: { email }
    })

    if (user) { return false };

    const newPassword = bcrypt.hashSync(password, 10);

    return await prisma.user.create({
        data: { name, email, password: newPassword }
    })
}

export const verifyUser = async (data: LoginData) => {

    const user = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (!user) return null;
    if (!(await bcrypt.compare(data.password, user.password))) return null;

    return user;
}

export const getUserById = async(id: number) => {
    return prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    })
}