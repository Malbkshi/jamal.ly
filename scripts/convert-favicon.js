const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert PNG to ICO
sharp('public/favicon.png')
  .resize(32, 32)
  .toFile('public/favicon.ico')
  .then(() => {
    console.log('Favicon converted successfully!');
  })
  .catch(err => {
    console.error('Error converting favicon:', err);
  }); 