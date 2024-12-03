// import { RouteHandler } from "@hono/zod-openapi";
import { ListRoute } from "./task.route";
import type { AppRouteHandler } from "@/lib/types";
import db from "@/db";

export const list : AppRouteHandler<ListRoute > = (c) => {
    return c.json([{id: "1", name: "Task 1", completed: false}]);
}