import { Server, Method } from "./server";
import { json } from "express";

const server = new Server();
const method = new Method();

method.use(json());

method.get("Hello world");

server.start();
