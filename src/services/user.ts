import bcrypt from "bcryptjs";
import { prisma } from "../libs/prisma";

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