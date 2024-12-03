import { createRoute, z } from "@hono/zod-openapi";


const tags = ["Tasks"];


const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
  description:z.string(),
  email:z.string().email(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});


// List Route
export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  summary: "List all tasks",
  description: "List all tasks",
  responses: {
    200: {
      description: "List of tasks",
      content: {
        "application/json": {
          schema: z.array(
            taskSchema
          ),
        },
      },
    },
  },
});

// Create Route
export const create = createRoute({
  tags,
  method: "post",
  path: "/tasks",
  summary: "Create a new task",
  description: "Create a new task",
  request: {
    body: {
        content: {
         "application/json": {
          schema: z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email address"),
            description: z.string().min(1, "Description is required"),
            completed: z.boolean(),
            })
        },
      },
  },
},
  responses: {
    201: {
      description: "Task created successfully",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    400: {
      description: "Invalid input",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

// Update Route
export const update = createRoute({
  tags,
  method: "put",
  path: "/tasks/{id}",
  summary: "Update a task",
  description: "Update a task",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "The ID of the task to update",
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            description: z.string().optional(),
            completed: z.boolean().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task updated successfully",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});


// Delete Route
export const deleteRoute = createRoute({
  tags,
  method: "delete",
  path: "/tasks/{id}",
  summary: "Delete a task",
  description: "Delete a task",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Task deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

// Patch Route
export const patch = createRoute({
  tags,
  method: "patch",
  path: "/tasks/{id}",
  summary: "Patch a task",
  description: "Patch a task",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "The ID of the task to update",
    },
  ],
  request: {
    body: {
        content: {
         "application/json": {
          schema: z.array(
            z.object({
              name: z.string().optional(),
              email: z.string().optional(),
              description: z.string().optional(),
              completed: z.boolean().optional(),
            })
          ),
        },
      },
  },
},
  responses: {
    200: {
      description: "Task patched successfully",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type DeleteRoute = typeof deleteRoute;
export type PatchRoute = typeof patch;
