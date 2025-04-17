import fs from "fs";

/**
 * Creates a directory if it doesn't exist.
 * @param {string} dirPath - The path of the directory to create.
 */
export const createDirectory = (dirPath) => {
  const directoryExists = fs.existsSync(dirPath);
  if (!directoryExists) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};
