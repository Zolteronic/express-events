import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import loginRouter from "./routes/login.js";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import errorCatcher from "./middleware/errorCatcher.js";
import timeMonitorMiddleware from "./middleware/timeMonitor.js";
import eventRouter from "./routes/events.js";

const app = express();

app.use(express.json());
app.use(timeMonitorMiddleware);

Sentry.init({
  dsn: "https://be0efbe244f1351b732ca36153653fcd@o4506775762501632.ingest.sentry.io/4506779447787520",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

/***********************************************************************************************************************************************************************/
// Routes are added here

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/events", eventRouter);
app.use("/categories", categoriesRouter);

/***********************************************************************************************************************************************************************/

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(errorCatcher);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
