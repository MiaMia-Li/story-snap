"use strict";
import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

const currentDir = process.cwd();

// Configuration
const config = {
  entry: [path.join(currentDir, "app", "**/*.{js,jsx,ts,tsx}")],
  output: path.join(currentDir, "locales"),
  // Improved regex to match English text in JSX and string literals
  englishRegExp:
    /(>|return\s*(?:\(\s*)?(?:<[^>]*>)?\s*(?:\{)?[`"])[^`"<>{}]*?([A-Za-z]+(?:\s+[A-Za-z]+)*)[^`"<>{}]*?(?:[`"]|\})/g,
  // Regex to extract specific text
  textExtractRegExp: /\b([A-Za-z]+(?:\s+[A-Za-z]+)*)\b/g,
};

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "es", label: "Español" },
] as const;

const messages: Record<string, string> = {};
let counter = 1;

function generateKey(text: string): string {
  const sanitizedText = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .substring(0, 32);
  return `message_${sanitizedText}_${counter++}`;
}

function cleanText(text: string): string {
  if (!text) return "";
  return text
    .trim()
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ");
}

function isValidText(text: string): boolean {
  const cleanedText = cleanText(text);
  return (
    cleanedText.length > 1 &&
    /^[A-Za-z\s]+$/.test(cleanedText) &&
    !cleanedText.includes("return") &&
    !cleanedText.includes("class") &&
    !/^(if|else|const|let|var|function|import|export)$/.test(cleanedText) &&
    !/^[A-Z][a-z]*(?:[A-Z][a-z]*)*$/.test(cleanedText) // Exclude CamelCase component names
  );
}

function extractEnglish(content: string): void {
  let match;
  while ((match = config.englishRegExp.exec(content)) !== null) {
    const potentialText = match[2];
    const textMatches = potentialText.match(config.textExtractRegExp);

    if (textMatches) {
      textMatches.forEach((text) => {
        if (isValidText(text)) {
          const cleanedText = cleanText(text);
          const existing = Object.entries(messages).find(
            ([_, value]) => value.toLowerCase() === cleanedText.toLowerCase()
          );

          if (!existing) {
            messages[generateKey(cleanedText)] = cleanedText;
          }
        }
      });
    }
  }
}

function scanFiles(): void {
  config.entry.forEach((pattern) => {
    const files = glob.sync(pattern);
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file, "utf-8");
        extractEnglish(content);
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    });
  });
}

function generateLocales(): void {
  try {
    if (!fs.existsSync(config.output)) {
      fs.mkdirSync(config.output, { recursive: true });
    }

    LANGUAGES.forEach(({ value: lang }) => {
      const langMessages = Object.keys(messages).reduce<Record<string, string>>(
        (acc, key) => {
          acc[key] =
            lang === "en"
              ? messages[key]
              : `TO TRANSLATE (${lang}): ${messages[key]}`;
          return acc;
        },
        {}
      );

      const outputFile = path.join(config.output, `${lang}.ts`);
      const content = `export default ${JSON.stringify(langMessages, null, 2)}`;
      fs.writeFileSync(outputFile, content);
    });
  } catch (error) {
    console.error("Error generating locales:", error);
    throw error;
  }
}

function main(): void {
  try {
    console.log("Starting English phrase extraction...");
    scanFiles();
    console.log(`Extracted ${Object.keys(messages).length} phrases`);
    generateLocales();
    console.log("Language packs generated successfully!");
  } catch (error) {
    console.error("Error in main process:", error);
    process.exit(1);
  }
}

main();
