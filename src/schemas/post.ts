import { z } from "zod";

export const PostSchema = z.object({
    title: z.string(),
    tag: z.string(),
    body: z.string()
})

export type PostData = z.infer<typeof PostSchema>
