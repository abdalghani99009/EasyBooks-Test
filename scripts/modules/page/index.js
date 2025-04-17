import { createPagesInModule } from "./createPage/index.js";

const moduleName = process.argv[2];
const pages = process.argv.slice(3);

await createPagesInModule(moduleName, pages);
