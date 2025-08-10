const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const path = require("path");
const { convert } = require("pdf-poppler");

const defaultDensity = 600;
let _density;


if (process.argv.length < 3) {
  console.log("USAGE: node index.js [path/file.pdf]\nUSAGE: node index.js [path/file.pdf] density");
  process.exit(1);
}

if (process.argv.length === 3) {
  _density = defaultDensity;
}

if (process.argv.length === 4) {
  _density = parseInt(process.argv[3], 10) || defaultDensity;
}

// Step 1: Read the PDF and get the number of pages
const pdfFilePath = process.argv[2].toString();

async function getNumPages(pdfPath) {
  const data = await fs.promises.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(data);
  return pdfDoc.getPageCount();
}

async function convertPdfToImages(pdfPath, density) {
  const outputDir = path.join(__dirname, "images");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: "page",
    page: null, // null means all pages
    dpi: density,
  };

  try {
    await convert(pdfPath, options);
    console.log(`PDF converted to images in ${outputDir}`);
  } catch (err) {
    console.error("Error converting PDF:", err);
  }
}

(async () => {
  try {
    const totalPages = await getNumPages(pdfFilePath);
    console.log("DENSITY:", _density);
    console.log("Total pages:", totalPages);

    await convertPdfToImages(pdfFilePath, _density);
  } catch (err) {
    console.error("Error:", err);
  }
})();
