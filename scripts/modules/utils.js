import path from "path";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter.js";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

export const modulesDir = path.join(process.cwd(), "src", "modules");

export const appRoutesDir = path.join(
  process.cwd(),
  "src",
  "routes",
  "index.tsx"
);

export const subfolders = [
  "pages",
  "components",
  "routes",
  "hooks",
  "layouts",
  "types",
];

/**
 * Processes a given module path string and converts it into folders.
 * @param {string} pathString - The path string (in the format "x/y/z").
 * @returns  An object containing capitalized folders and the full path of the module.
 */
export const processModulePath = (pathString) => {
  const folders = pathString.split("/").map(capitalizeFirstLetter);
  const modulePathInModules = folders.join("/");
  const moduleFullPath = path.join(modulesDir, ...folders);
  return { folders, moduleFullPath, modulePathInModules };
};

/**
 * Processes a given path string and converts it into folders.
 * @param {string} pathString - The path string (in the format "x/y/z").
 * @returns  An array of capitalized folders.
 */
export const getCapitalizedFolders = (pathString) => {
  const folders = pathString.split("/").map(capitalizeFirstLetter);
  return folders;
};

/**
 * Creates the index.tsx file for routes.
 * @param {string} folderPath - The path to the routes folder.
 * @param {string} componentContent - The name of the module for naming the component.
 * @param {string} fileExtension - The extenstion of the index file.
 */
export const createIndexFile = (
  folderPath,
  componentContent,
  fileExtension
) => {
  const indexFilePath = path.join(folderPath, `index.${fileExtension}`);
  const fileExists = fs.existsSync(indexFilePath);
  if (!fileExists) {
    fs.writeFileSync(indexFilePath, componentContent);
    console.log(`Created file: ${indexFilePath}`);
  } else {
    console.log(`File: ${indexFilePath} already exists`);
  }
};

/**
 *
 * @param {string} moduleName - module name to formate after creation.
 */
export const formatModule = async (moduleName) => {
  const execPromise = promisify(exec);

  const { modulePathInModules } = processModulePath(moduleName);
  console.log(`Formatting module: ${modulePathInModules}`);

  try {
    await execPromise(
      `prettier --write "./src/modules/${modulePathInModules}/**/*.{js,jsx,ts,tsx}"`
    );
    console.log("Module formatted successfully.");

    await execPromise(`prettier --write "./src/routes/index.tsx"`);
    console.log("Routes formatted successfully.");
  } catch (error) {
    console.error(`Error executing Prettier: ${error.message}`);
  }
};
