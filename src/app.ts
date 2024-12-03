import createApp from '@/lib/create-app.js';
import configureOpenAPI from '@/db/configure-open-api';
import index from '@/routes/index.route';
import tasks from '@/routes/tasks/task.index';

const app = createApp();

const routes = [index, tasks]

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/",route);
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
}); 

export default app;