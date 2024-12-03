import { createRouter } from "@/lib/create-app";
import * as handlers from "@/routes/tasks/task.handler";
import * as routes from "@/routes/tasks/task.route";


const router = createRouter()
.openapi(routes.list, handlers.list) 
.openapi(routes.create, handlers.create)
.openapi(routes.update, handlers.update)
.openapi(routes.deleteRoute, handlers.deleteRoute)




export default router;