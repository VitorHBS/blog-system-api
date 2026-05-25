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


export const EditPost = z.object({
    status: z.enum(["PUBLISHED", "DRAFT"]).optional(),
    title: z.string().optional(),
    tags: z.string().optional(),
    body: z.string().optional()
})

export type EditData = z.infer<typeof EditPost>