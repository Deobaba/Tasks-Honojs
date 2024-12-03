import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";

const router = createRouter()
    .openapi(createRoute({
        tags: ["Index"],
        method: "get",
        path: "/",
        summary: "Home page",
        description: "This is the home page.",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: z.object({
                            message: z.string(),
                        }),
                    },
                },
            },
        },
       
    }),
    (c) => {
        return c.json({ message: "Hello, world!" });
    }
)


export default router;