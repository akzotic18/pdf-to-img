# PDF to PNG Converter

This is a simple Node.js script that converts each page of a PDF into high-resolution PNG images using [`pdf2pic`](https://www.npmjs.com/package/pdf2pic) and `pdf-parse`.

## 📦 Features

- Converts **every page** of a PDF into PNG format
- Automatically detects the number of pages
- Saves output to the `./images` directory

## 🛠 Requirements

- Node.js
- npm

## 📥 Installation

1. Clone the repository or copy the script.
2. Navigate to the project directory.
3. Install the dependencies:

```bash
npm install pdf2pic pdf-parse
```

> Note: If you’re using this in a production environment or uploading, consider using a `.gitignore` for large image files or node_modules.

## 🚀 Usage

```bash
node index.js path/to/your/file.pdf
node index.js path/to/your/file.pdf density
```

Example:

```bash
node index.js ./sample.pdf
node index.js ./sample.pdf 300
```

The script will:

- Parse the PDF to determine the number of pages
- Convert each page to a PNG
- Save the PNGs in the `./images` folder (created if it doesn't exist)

## 📁 Output

The output images will be named:

```
page.1.png
page.2.png
...
```

## 🧪 Sample Output

```
DENSITY: 600
Page 1 converted: { path: './images/page.1.png', ... }
Page 2 converted: { path: './images/page.2.png', ... }
```

## ⚠️ Notes

- Make sure the `images/` directory is writable.
- The script uses a high resolution (600 DPI) by default; you can adjust this during execution.
