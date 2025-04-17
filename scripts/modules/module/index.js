import { createModules } from "./createModule/index.js";

// Get module names from command line arguments
const modules = process.argv.slice(2);

createModules(modules);
