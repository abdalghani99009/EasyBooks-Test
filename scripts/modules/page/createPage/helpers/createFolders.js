import path from "path";
import { createIndexFile } from "../../../utils.js";
import {
  hookComponentStub,
  pageComponentStub,
  typeStub,
} from "../../../stubs.js";
import { createDirectory } from "../../../../utils.js";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter.js";

/**
 * Creates required folders for a page in a module and generates relevant files.
 *
 * @param {string} moduleFullPath - The full path of the module.
 * @param {string[]} pageFolders - Folder names for the page.
 * @param {string} modulePath - Path structure for the module.
 */
export const createPageFolders = (moduleFullPath, pageFolders, modulePath) => {
  const lastFolderInPageName = pageFolders[pageFolders.length - 1];
  const pageName = lastFolderInPageName
    .split("-")
    .map((subString, index) =>
      index !== 0 ? capitalizeFirstLetter(subString) : subString
    )
    .join("");

  ["hooks", "pages", "components", "types"].forEach((folder) => {
    const folderPath = path.join(moduleFullPath, folder, ...pageFolders);
    createDirectory(folderPath);
    if (folder !== "components") {
      const content =
        folder === "pages"
          ? pageComponentStub(pageName, pageFolders.join("/"), modulePath)
          : folder === "types"
            ? typeStub(pageName)
            : hookComponentStub(pageName, pageFolders.join("/"), modulePath);
      const fileExtension =
        folder === "types" || folder === "hooks" ? "ts" : "tsx";

      createIndexFile(folderPath, content, fileExtension);
    }
  });
};
