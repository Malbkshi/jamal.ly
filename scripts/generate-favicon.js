const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create multiple sizes for different devices
const sizes = [16, 32, 48, 64, 128, 256];

async function generateFavicons() {
  try {
    // Create app directory if it doesn't exist
    if (!fs.existsSync('src/app')) {
      fs.mkdirSync('src/app', { recursive: true });
    }

    // Generate ICO file with multiple sizes
    const icoBuffer = await sharp('public/images/logo.png')
      .resize(32, 32)
      .toBuffer();

    // Save ICO file
    fs.writeFileSync('src/app/favicon.ico', icoBuffer);
    console.log('Generated favicon.ico');

    // Generate PNG files for different sizes
    for (const size of sizes) {
      await sharp('public/images/logo.png')
        .resize(size, size)
        .toFile(`public/favicon-${size}x${size}.png`);
      console.log(`Generated favicon-${size}x${size}.png`);
    }

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 