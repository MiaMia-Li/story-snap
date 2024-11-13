"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGES = void 0;
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var currentDir = process.cwd();
// Configuration
var config = {
    entry: [path.join(currentDir, "app", "**/*.{js,jsx,ts,tsx}")],
    output: path.join(currentDir, "locales"),
    // Improved regex to match English text in JSX and string literals
    englishRegExp: /(>|return\s*(?:\(\s*)?(?:<[^>]*>)?\s*(?:\{)?[`"])[^`"<>{}]*?([A-Za-z]+(?:\s+[A-Za-z]+)*)[^`"<>{}]*?(?:[`"]|\})/g,
    // Regex to extract specific text
    textExtractRegExp: /\b([A-Za-z]+(?:\s+[A-Za-z]+)*)\b/g,
};
exports.LANGUAGES = [
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "es", label: "Español" },
];
var messages = {};
var counter = 1;
function generateKey(text) {
    var sanitizedText = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .substring(0, 32);
    return "message_".concat(sanitizedText, "_").concat(counter++);
}
function cleanText(text) {
    if (!text)
        return "";
    return text
        .trim()
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ");
}
function isValidText(text) {
    var cleanedText = cleanText(text);
    return (cleanedText.length > 1 &&
        /^[A-Za-z\s]+$/.test(cleanedText) &&
        !cleanedText.includes("return") &&
        !cleanedText.includes("class") &&
        !/^(if|else|const|let|var|function|import|export)$/.test(cleanedText) &&
        !/^[A-Z][a-z]*(?:[A-Z][a-z]*)*$/.test(cleanedText) // Exclude CamelCase component names
    );
}
function extractEnglish(content) {
    var match;
    while ((match = config.englishRegExp.exec(content)) !== null) {
        var potentialText = match[2];
        var textMatches = potentialText.match(config.textExtractRegExp);
        if (textMatches) {
            textMatches.forEach(function (text) {
                if (isValidText(text)) {
                    var cleanedText_1 = cleanText(text);
                    var existing = Object.entries(messages).find(function (_a) {
                        var _ = _a[0], value = _a[1];
                        return value.toLowerCase() === cleanedText_1.toLowerCase();
                    });
                    if (!existing) {
                        messages[generateKey(cleanedText_1)] = cleanedText_1;
                    }
                }
            });
        }
    }
}
function scanFiles() {
    config.entry.forEach(function (pattern) {
        var files = glob.sync(pattern);
        files.forEach(function (file) {
            try {
                var content = fs.readFileSync(file, "utf-8");
                extractEnglish(content);
            }
            catch (error) {
                console.error("Error reading file ".concat(file, ":"), error);
            }
        });
    });
}
function generateLocales() {
    try {
        if (!fs.existsSync(config.output)) {
            fs.mkdirSync(config.output, { recursive: true });
        }
        exports.LANGUAGES.forEach(function (_a) {
            var lang = _a.value;
            var langMessages = Object.keys(messages).reduce(function (acc, key) {
                acc[key] =
                    lang === "en"
                        ? messages[key]
                        : "TO TRANSLATE (".concat(lang, "): ").concat(messages[key]);
                return acc;
            }, {});
            var outputFile = path.join(config.output, "".concat(lang, ".ts"));
            var content = "export default ".concat(JSON.stringify(langMessages, null, 2));
            fs.writeFileSync(outputFile, content);
        });
    }
    catch (error) {
        console.error("Error generating locales:", error);
        throw error;
    }
}
function main() {
    try {
        console.log("Starting English phrase extraction...");
        scanFiles();
        console.log("Extracted ".concat(Object.keys(messages).length, " phrases"));
        generateLocales();
        console.log("Language packs generated successfully!");
    }
    catch (error) {
        console.error("Error in main process:", error);
        process.exit(1);
    }
}
main();
