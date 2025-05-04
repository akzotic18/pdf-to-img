const { fromPath } = require("pdf2pic");
const fs = require("fs");
const pdfParse = require("pdf-parse");  // Add pdf-parse to extract the number of pages

// Step 1: Read the PDF and get the number of pages
const pdfFilePath = "PRELIMPAF.pdf";
fs.readFile(pdfFilePath, (err, data) => {
  if (err) {
    console.error("Error reading PDF:", err);
    return;
  }

  pdfParse(data).then((pdfData) => {
    const totalPages = pdfData.numpages; // Get the number of pages in the PDF

    // Step 2: Create the converter
    const convert = fromPath(pdfFilePath, {
      density: 600,                     // quality/resolution
      saveFilename: "page",
      savePath: "./images",
      format: "png",
      // width: 1024,                      // set only width
      preserveAspectRatio: true               // output format
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
