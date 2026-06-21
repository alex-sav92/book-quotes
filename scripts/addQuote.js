const fs = require("fs");

const issueBody =
  process.env.ISSUE_BODY;

let parsed;

try {
  parsed = JSON.parse(issueBody);
} catch (e) {
  console.error("Invalid JSON in issue body");
  console.error(issueBody);
  process.exit(1);
}

const filePath =
  "data/quotes.json";

let quotes = [];

if (fs.existsSync(filePath)) {
  quotes = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );
}

const newQuote = {
  id: Date.now(),
  book: parsed.book || "Unknown",
  author: parsed.author || "Unknown",
  quote: parsed.quote || "",
  tags: parsed.tags || [],
  dateAdded: parsed.dateAdded || new Date().toISOString()
};

// Prevent empty quotes
if (!newQuote.quote.trim()) {
  console.log("Empty quote ignored");
  process.exit(0);
}

// Avoid duplicates (basic protection)
const exists = quotes.some(q =>
  q.quote === newQuote.quote
);

if (exists) {
  console.log("Duplicate ignored");
  process.exit(0);
}

quotes.unshift(newQuote);

fs.writeFileSync(
  filePath,
  JSON.stringify(quotes, null, 2)
);

console.log("Quote added:", newQuote.book);