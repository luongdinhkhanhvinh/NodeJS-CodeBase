// tslint:disable:ordered-imports
import "reflect-metadata";

import "module-alias/register";
import { AppContainer } from "@injection/appContainer";
import { Server } from "./server";

process.on("uncaughtException", (err) => {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

const appContainer = new AppContainer();
appContainer.inject();
const server = new Server(appContainer);

server.start();
