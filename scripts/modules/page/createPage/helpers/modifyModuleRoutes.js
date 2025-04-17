import path from "path";
import fs from "fs";
import { modulesDir } from "../../../utils.js";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter.js";

export const modifyModuleRoutes = (pagePath, modulePath) => {
  const pageName = pagePath.split("/").pop();
  const processedPageName = pageName
    .split("-")
    .map((subString, index) =>
      index !== 0 ? capitalizeFirstLetter(subString) : subString
    )
    .join("");
  const lazyImportString = `const ${processedPageName} = lazy(() => import("@/modules/${modulePath}/pages/${pagePath}"));`;
  const setupRoutesString = `\n<Route path="/${pageName.toLowerCase()}" element={<${processedPageName} />} />\n`;

  const moduleRoutesPath = path.join(
    modulesDir,
    modulePath,
    "routes",
    "index.tsx"
  );
  let content = fs.readFileSync(moduleRoutesPath, "utf8");

  // Check if the import statement already exists to avoid duplicates
  if (!content.includes(`const ${processedPageName} = lazy(`)) {
    // Insert the lazy import after the last import statement
    const lastImportIndex = content.lastIndexOf("import") + 1; // Get the end of the last import line

    // If there are imports, insert the lazy import correctly
    if (lastImportIndex > 0) {
      // Find the end of the last import statement
      const endOfLastImport = content.indexOf(";", lastImportIndex) + 1; // Move to the end of the last import statement
      content =
        content.slice(0, endOfLastImport) + // Up to and including the last import statement
        `\n${lazyImportString}` + // Add the lazy import
        content.slice(endOfLastImport); // Continue from after the last import statement
    } else {
      // Handle case where there are no imports (insert at the start)
      content = `${lazyImportString}\n${content}`;
    }

    // Insert the setupRoutesString right after the first occurrence of '<>'
    const insertionPoint = content.indexOf("<Routes>");

    if (insertionPoint !== -1) {
      content =
        content.slice(0, insertionPoint + "<Routes>".length) +
        `${setupRoutesString}` + // Insert without adding a newline afterwards
        content.slice(insertionPoint + "<Routes>".length); // Continue from the next character
    }

    // Write the updated content back to the file
    fs.writeFileSync(moduleRoutesPath, content);
    console.log(
      `Updated module ${modulePath} routes: added ${processedPageName} route.`
    );
  } else {
    console.log(
      `Module route for '${processedPageName}' is already included in ${modulePath} routes.`
    );
  }
};
