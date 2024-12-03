import { OpenAPIHono } from '@hono/zod-openapi';
import { pinoLogger } from '@/middleware/pino-logger.js';
import { AppBindings } from './types';

export function createRouter(){
    return new OpenAPIHono<AppBindings>({strict: false});
}

export default function createApp(){
const app = createRouter();

app.use(pinoLogger());

return app

}

