import { createInterface } from "readline";

const rl = createInterface(process.stdin, process.stdout);

/**
 * Asks the user for confirmation to create a module.
 * @returns {Promise<boolean>} - Resolves to true if user wants to create the module, otherwise false.
 */
export const confirmCreateModule = () => {
  return new Promise((resolve) => {
    rl.question(
      "Module doesn't exist, do you want to create it? (yes/no): ",
      (answer) => {
        if (answer.trim().toLowerCase() === "yes") {
          console.log("Creating the module...");
          resolve(true);
        } else if (answer.trim().toLowerCase() === "no") {
          console.log("Module creation canceled.");
          resolve(false);
        } else {
          console.log('Please answer with "yes" or "no".');
          resolve(confirmCreateModule()); // Repeat the question recursively
        }
      }
    );
  });
};
