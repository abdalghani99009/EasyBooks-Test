import path from "path";
import { subfolders } from "../../../utils.js";
import { createDirectory } from "../../../../utils.js";
import { createIndexFile } from "../../../utils.js";
import { routeComponentStub } from "../../../stubs.js";

/**
 * Creates the necessary subfolders for a module and initializes an index file.
 * @param {string} moduleFullPath - The full path of the module.
 * @param {Array<string>} folders - The capitalized folder names.
 */
export const setupSubfolders = (moduleFullPath, folders) => {
  subfolders.forEach((folder) => {
    const folderPath = path.join(moduleFullPath, folder);
    createDirectory(folderPath);

    // Create the index.tsx file in the routes folder
    if (folder === "routes") {
      const lastFolderName = folders[folders.length - 1];
      const componentContent = routeComponentStub(lastFolderName);
      createIndexFile(folderPath, componentContent, "tsx");
    }
  });
};
