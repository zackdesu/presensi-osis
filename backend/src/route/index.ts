// Auth
import { router as getRouter } from "./auth/get";
import { router as postRouter } from "./auth/post";
import { router as putRouter } from "./auth/put";
import { router as deleteRouter } from "./auth/delete";
import { router as dataRouter } from "./data";

// Meeting
import { router as meetingRouter } from "./meeting/meeting";

export {
  getRouter,
  postRouter,
  putRouter,
  deleteRouter,
  dataRouter,
  meetingRouter,
};
