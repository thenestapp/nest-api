import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

import { createFileSystemTools } from "@nest-ai/tools/filesystem";
import { visionTool } from "@nest-aiols/vision";
import { agent } from "nest-aient";
import { workflow } from "nest-airkflow";

export const workingDir = path.resolve(import.meta.dirname, "../assets/");

const { saveFile, readFile, listFilesFromDirectory } = createFileSystemTools({
  workingDir,
});

const librarian = agent({
  description: `
    You are skilled at scanning and identifying books in the library.
    You can analyze the photo of the library and list all the books that you see, in details.
  `,
  tools: {
    visionTool,
  },
});

const webmaster = agent({
  description: `
    You are skilled at creating HTML pages. 
    You are good at using templates for creating HTML pages.
    You can analyze existing HTML page and replace the content with the new one.
  `,
  tools: {
    saveFile,
    readFile,
    listFilesFromDirectory,
  },
});

export const imagePath = path.join(workingDir, "photo-library.jpg");
export const outputPath = path.join(workingDir, "library.html");

await fs.rm(outputPath, { force: true });

export const bookLibraryWorkflow = workflow({
  team: { librarian, webmaster },
  description: `
    Analyze the photo of the library and list all the books in the library.
    Find the best template to use for the website.
    Use the template to create a HTML page with the list of books and save it to "${outputPath}" file.
  `,
  knowledge: `
    Important information:
    - The photo of books in the library is in the "${imagePath}" file.
    - All available templates are in "${workingDir}" directory.
    - You only have access to files in "${workingDir}" directory.
    - File system operations are expensive, use them wisely. Especially saving files.
    - Use absolute paths for tool calls.
  `,
  output: `
    Valid HTML page with the list of books in the library, saved in "${outputPath}" file.
  `,
});
