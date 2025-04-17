import fs from "fs";
import { formatModule, modulesDir, processModulePath } from "../../utils.js";
import { setupSubfolders } from "./helpers/createFolders.js";
import { modifyAppRoutes } from "./helpers/modifyRoutes.js";
import { createDirectory } from "../../../utils.js";

/**
 * Creates a module structure with specified subdirectories and an index file.
 * @param {string} moduleName - The name of the module to create (in the format "w/w1/w2/w3").
 */
export const createModule = (moduleName) => {
  const { folders, moduleFullPath } = processModulePath(moduleName);

  createDirectory(modulesDir);

  // Check if the module already exists
  if (fs.existsSync(moduleFullPath)) {
    console.error(`Module '${moduleName}' already exists at ${moduleFullPath}`);
  }

  // Create the full path for the module (including nested folders)
  createDirectory(moduleFullPath);

  // Create subfolders and the index.tsx file in the routes folder
  setupSubfolders(moduleFullPath, folders);

  modifyAppRoutes(folders.join("/"));

  console.log(
    `Module '${moduleName}' created successfully at ${moduleFullPath}`
  );

  formatModule(moduleName);
};

/**
 * Creates multiple modules based on the provided module names.
 * @param {string[]} modules - The names of the modules to create (in the format "w/w1/w2/w3").
 */
export const createModules = (modules) => {
  if (modules.length === 0) {
    console.error("Please provide a module name.");
    process.exit(1);
  }

  modules.forEach(createModule); // Call the function to create each module
};
