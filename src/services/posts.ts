import { v4 } from "uuid";
import fs from "fs/promises";
import slug from "slug";
import { prisma } from "../libs/prisma";
import type { CreatePostData } from "../schemas/post";
import type { Prisma } from "@prisma/client";

export const getAllPublishedPosts = async (page: number) => {
    let perPage = 5;
    if (page <= 0) return [];

    const posts = prisma.post.findMany({
        where: { 
            status: "PUBLISHED" 
        },
        include: {
            author: {
                select: {
                    name: true
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        take: perPage,
        skip: (page - 1) * perPage
    })

    return posts;
}

export const getAllPosts = async (page: number) => {
    let perPage = 5;
    if (page <= 0) return [];

    const posts = prisma.post.findMany({
        include: {
            author: {
                select: {
                    name: true
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        take: perPage,
        skip: (page - 1) * perPage
    })

    return posts;
}



export const getPostBySlug = async (slug: string) => {
    return prisma.post.findUnique({
        where: { slug },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}


export const handleCover = async (file: Express.Multer.File) => {
    const allowed = ["image/jpeg", "image/png"];

    if (!allowed.includes(file.mimetype)) return false;

    const extension = file.mimetype.split("/")[1];
    const coverName = `${v4()}.${extension}`;

    try {
        await fs.rename(
            file.path,
            `./public/images/covers/${coverName}`
        );

        return coverName;

    } catch (err) {
        return false;
    }
}

export const createPostSlug = async (title: string) => {
    let newSlug = slug(title);
    let keepTrying = true;
    let postCount = 1;

    while (keepTrying) {
        const post = await getPostBySlug(newSlug)

        if (!post) {
            keepTrying = false;
        } else {
            newSlug = slug(`${title} ${++postCount}`);
        }
    }
    return newSlug
}

export const createPost = async (data: CreatePostData) => {
    return await prisma.post.create({ data })
}

export const updatePost = async (slug: string, data: Prisma.PostUpdateInput) => {
    return await prisma.post.update({
        where: { slug },
        data
    })
}