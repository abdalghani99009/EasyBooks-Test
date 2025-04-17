import fs from "fs";
import {
  formatModule,
  getCapitalizedFolders,
  processModulePath,
} from "../../utils.js";
import { createModule } from "../../module/createModule/index.js";
import { createPageFolders } from "./helpers/createFolders.js";
import { modifyModuleRoutes } from "./helpers/modifyModuleRoutes.js";
import { confirmCreateModule } from "./helpers/confirmCreateModule.js";

/**
 * Creates a directory for a page within a module and populates it with relevant files.
 *
 * @param {string} pageName - The name of the page to create.
 * @param {string} moduleName - The name of the module to attach the page to.
 */
export const createPageInModule = (pageName, moduleFolders, moduleFullPath) => {
  const pageFolders = getCapitalizedFolders(pageName);

  createPageFolders(moduleFullPath, pageFolders, moduleFolders.join("/"));

  modifyModuleRoutes(pageFolders.join("/"), moduleFolders.join("/"));
};

/**
 * Creates multiple pages within a specified module.
 *
 * @param {string} moduleName - The name of the module.
 * @param {string[]} pages - An array of page names to create.
 */
export const createPagesInModule = async (moduleName, pages) => {
  if (!moduleName) {
    console.error("Please provide a module name.");
    process.exit(1);
  }

  if (pages.length === 0) {
    console.error("Please provide at least one page name.");
    process.exit(1);
  }
  const { folders: moduleFolders, moduleFullPath } =
    processModulePath(moduleName);
  const moduleExists = fs.existsSync(moduleFullPath);

  if (!moduleExists) {
    const userConfirmed = await confirmCreateModule();

    if (userConfirmed) {
      createModule(moduleName);
    } else {
      process.exit(1); // Exit if the user cancels the operation
    }
  }

  pages.forEach((page) =>
    createPageInModule(page, moduleFolders, moduleFullPath)
  );

  if (fs.existsSync(moduleFullPath)) {
    await formatModule(moduleName);
  }

  process.exit(0);
};
