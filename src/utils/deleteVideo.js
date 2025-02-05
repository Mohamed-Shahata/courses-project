import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CustomError from "./customerError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFile = (filePath) => {
  const fullPath = path.join(__dirname, "../..", filePath);
  console.log("prosses: ", fullPath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.log("Error deleteing file", err)
      return new CustomError("Error deleteing file", 400);
    }

  })
}

export default deleteFile