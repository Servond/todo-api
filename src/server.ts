import App from "./app";

import { AuthRoute } from "./routes/auth.route";
import { TodoRoute } from "./routes/todo.route";

const app = new App([new AuthRoute(), new TodoRoute()]);

app.listen();
