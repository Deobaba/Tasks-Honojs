// import { RouteHandler } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { ListRoute, CreateRoute, UpdateRoute, DeleteRoute, 
  PatchRoute } from "./task.route";
import type { AppRouteHandler } from "@/lib/types";
import db from "@/db";
import { tasks } from "@/db/schema";


export const list : AppRouteHandler< ListRoute > = async (c) => {
    const tasks = await db.query.tasks.findMany();
    return c.json(tasks);
}



// Create handler
export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const body = await c.req.json();
    try {
      const [newTask ]= await db.insert(tasks).values(body).returning();
      return c.json(newTask, 201);
    } catch (error) {
      return c.json({ error: (error as Error)?.message }, 400);
    }
  };
  
  // Update handler
  export const update: AppRouteHandler<UpdateRoute> = async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    try {
      const [updatedTask]= await db.update(tasks).set(body).where(eq(tasks.id,id)).returning();
      if (!updatedTask) {
        return c.json({ error: "Task not found" }, 404);
      }
      return c.json(updatedTask,200);
    } catch (error) {
      return c.json({ error: (error as Error)?.message}, 404);
    }
  };
  
  // Delete handler
  export const deleteRoute: AppRouteHandler<DeleteRoute> = async (c) => {
    const id = Number(c.req.param("id"));
    try {
      const deletedTask = await db.delete(tasks)
                  .where(eq(tasks.id, id));

      if (!deletedTask) {
        return c.json({ error: "Task not found" }, 404);
      }
      return c.json({ message: "Task deleted successfully" },200);
    } catch (error) {
      return c.json({ error: (error as Error)?.message}, 404);
    }
  };
  
  // Patch handler
  export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    try {
      const [patchedTask ]= await db.update(tasks).set(body).where(eq(tasks.id, id)).returning();
      if (!patchedTask) {
        return c.json({ error: "Task not found" }, 404);
      }
      return c.json(patchedTask,200);
    } catch (error) {
      return c.json({ error: (error as Error)?.message}, 404);
    }
  };