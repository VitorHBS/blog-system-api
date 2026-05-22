import { z } from "zod";

export const PostSchema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string()
})

export type PostData = z.infer<typeof PostSchema>


export const CreatePostSchema = z.object({
    authorId: z.number(),
    slug: z.string(),
    title: z.string(),
    tags: z.string(),
    body: z.string(),
    cover: z.string()
})

export type CreatePostData = z.infer<typeof CreatePostSchema>