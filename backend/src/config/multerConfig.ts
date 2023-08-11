import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage }).single("file");

export { upload };
