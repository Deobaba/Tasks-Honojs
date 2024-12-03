import { OpenAPIHono } from '@hono/zod-openapi';
import { pinoLogger } from '@/middleware/pino-logger.js';
import { PinoLogger } from 'hono-pino';

interface AppBindings {
    variables: {
        logger: PinoLogger
    }
}
export default function createApp(){
const app = new OpenAPIHono<AppBindings>({strict: false});

app.use(pinoLogger());

return app

}

