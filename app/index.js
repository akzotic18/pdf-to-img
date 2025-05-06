const { fromPath } = require("pdf2pic");
const fs = require("fs");
const pdfParse = require("pdf-parse");  // Add pdf-parse to extract the number of pages
const defaultDensity = 600;

var _density;


if (process.argv.length < 3) {
  console.log("USAGE: node index.js [path/file.pdf]\nUSAGE: node index.js [path/file.pdf] density");
  return 1;
}

if (process.argv.length == 3) {
  _density = defaultDensity;
}

if (process.argv.length == 4) {
  try {
    _density = process.argv[3].toString();
  } catch (e) {
    console.log(e.message);
  }
}

// Step 1: Read the PDF and get the number of pages
const pdfFilePath = process.argv[2].toString();

fs.readFile(pdfFilePath, (err, data) => {
  if (err) {
    console.error("Error reading PDF:", err);
    return;
  }

  pdfParse(data).then((pdfData) => {

    const totalPages = pdfData.numpages; // Get the number of pages in the PDF

    console.log('DENSITY: ', _density);

    // Step 2: Create the converter
    const convert = fromPath(pdfFilePath, {
      density: _density,                     // quality/resolution
      saveFilename: "page",
      savePath: "./images",
      format: "png",
      // width: 1024,                      // set only width
      preserveAspectRatio: true,               // output format
    });

    // Step 3: Loop through each page and convert
    for (let page = 1; page <= totalPages; page++) {
      convert(page)
        .then((res) => {
          console.log(`Page ${page} converted:`, res);
        })
        .catch((err) => {
          console.error(`Error converting page ${page}:`, err);
        });
    }
  }).catch((err) => {
    console.error("Error parsing PDF:", err);
  });
});
