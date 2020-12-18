"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:ordered-imports
require("reflect-metadata");
require("module-alias/register");
const appContainer_1 = require("@injection/appContainer");
const server_1 = require("./server");
process.on("uncaughtException", (err) => {
    console.error(new Date().toUTCString() + " uncaughtException:", err.message);
    console.error(err.stack);
    process.exit(1);
});
const appContainer = new appContainer_1.AppContainer();
appContainer.inject();
const server = new server_1.Server(appContainer);
server.start();
//# sourceMappingURL=index.js.map