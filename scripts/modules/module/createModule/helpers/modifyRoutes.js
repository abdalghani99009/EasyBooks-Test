import fs from "fs";
import { appRoutesDir } from "../../../utils.js";

/**
 * Modifies the AppRoutes component to include the new ModuleRoutes.
 * @param {string} moduleName
 */
export const modifyAppRoutes = (moduleName) => {
  const moduleRouteName = moduleName.split("/").pop();
  const lazyImportString = `const ${moduleRouteName}Routes = lazy(() => import("@/modules/${moduleName}/routes"));`;
  const setupRoutesString = `\n<Route path="/${moduleRouteName.toLocaleLowerCase()}/*" element={<${moduleRouteName}Routes />} />`;

  let content = fs.readFileSync(appRoutesDir, "utf8");

  // Check if the import statement already exists to avoid duplicates
  if (!content.includes(lazyImportString)) {
    const lastImportIndex = content.lastIndexOf("import") + 1;

    // If there are imports, insert the lazy import correctly
    if (lastImportIndex > 0) {
      const endOfLastImport = content.indexOf(";", lastImportIndex) + 1; // Move to the end of the last import statement
      content =
        content.slice(0, endOfLastImport) + // Up to and including the last import statement
        `\n${lazyImportString}` + // Add the lazy import
        content.slice(endOfLastImport); // Continue from after the last import statement
    } else {
      content = `${lazyImportString}\n${content}`;
    }

    // Insert the setupRoutesString right after the first occurrence of '<Routes>'
    const insertionPoint = content.indexOf("<Routes>");

    if (insertionPoint !== -1) {
      content =
        content.slice(0, insertionPoint + "<Routes>".length) +
        `${setupRoutesString}` +
        content.slice(insertionPoint + "<Routes>".length);
    }

    // Write the updated content back to the file
    fs.writeFileSync(appRoutesDir, content);
    console.log(`Updated routing in AppRoutes for module: ${moduleName}`);
  } else {
    console.log(
      `Module routes for '${moduleName}' are already included in AppRoutes.`
    );
  }
};
