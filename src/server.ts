import App from "./app";

import { AuthRoute } from "./routes/auth.route";
import { TodoRoute } from "./routes/todo.route";
import { QueueRoute } from "./routes/queue.route";

const app = new App([new AuthRoute(), new TodoRoute(), new QueueRoute()]);

app.listen();
