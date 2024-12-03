 import {createRoute, z} from "@hono/zod-openapi";


export  const list = createRoute({
        tags: ["Tasks"],
        method: "get",
        path: "/tasks",
        summary: "List all tasks",
        description: "List all tasks",
        responses: {
            200: {
                description: "List of tasks",
                content: {
                    "application/json": {
                        schema:z.array(z.object({
                            id: z.string(),
                            name: z.string(),
                            completed: z.boolean(),
                        })),
                    },
                },
            },
        },
    },
 )


 export type ListRoute = typeof list;