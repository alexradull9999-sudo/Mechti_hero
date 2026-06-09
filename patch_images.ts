import fs from 'fs';
import path from 'path';

const DATA_FILE = './src/data.ts';
const DETAILS_FILE = './src/propertyDetails.json';

// 1. Repair src/data.ts
let dataContent = fs.readFileSync(DATA_FILE, 'utf8');

// The matching IDs are prop-a-XXXX
// We can find objects in dataContent and replace their "image": "/properties/..." lines
const idsToReplace = ['0820', '0817', '1326', '0796', '0933', '0919', '0795', '0738', '1403'];

for (const idSuffix of idsToReplace) {
  const propId = `prop-a-${idSuffix}`;
  console.log(`Replacing coverage image for ${propId}...`);
  
  // We need to find the specific block with this ID and replace the "image" line within it
  // A regex can capture from "id": "prop-a-XXXX" to the matching "badge" or next "}" and replace the image path
  const blockRegex = new RegExp(`(\"id\":\\s*\"${propId}\"[\\s\\S]*?\"image\":\\s*\")([^\"]+)(\")`, 'g');
  if (blockRegex.test(dataContent)) {
    dataContent = dataContent.replace(blockRegex, `$1/site/a-${idSuffix}.avif$3`);
    console.log(` -> Replaced cover for ${propId} to /site/a-${idSuffix}.avif`);
  } else {
    console.log(` -> [WARNING] Ready block for ${propId} not found with regex`);
  }
}

fs.writeFileSync(DATA_FILE, dataContent, 'utf8');
console.log('Saved updated src/data.ts');

// 2. Repair src/propertyDetails.json
const details = JSON.parse(fs.readFileSync(DETAILS_FILE, 'utf8'));

for (const key of Object.keys(details)) {
  const item = details[key];
  if (!item.images) {
    item.images = [];
  }
  
  // Check if there is an id match prop-a-XXXX and add /site/a-XXXX.avif as the first image
  const match = key.match(/^prop-a-(\d+)/);
  const coverImage = match ? `/site/a-${match[1]}.avif` : null;
  
  const originalImages = item.images;
  const validImages: string[] = [];
  
  if (coverImage && fs.existsSync(`./public${coverImage}`)) {
    validImages.push(coverImage);
  }
  
  for (const imgPath of originalImages) {
    // skip if it's the same cover we just added
    if (imgPath === coverImage) continue;
    
    const diskPath = `./public${imgPath}`;
    if (fs.existsSync(diskPath)) {
      validImages.push(imgPath);
    } else {
      //console.log(`Filtering out missing image: ${imgPath}`);
    }
  }
  
  // If no images are valid, fallback to the main property image from data.ts or a generic fallback
  if (validImages.length === 0) {
    if (coverImage) {
      validImages.push(coverImage);
    } else {
      validImages.push('/site-images/photo-1600210492486-724fe5c67fb0.avif');
    }
  }
  
  item.images = validImages;
  console.log(`Finished ${key}: now has ${validImages.length} valid images.`);
}

fs.writeFileSync(DETAILS_FILE, JSON.stringify(details, null, 2), 'utf8');
console.log('Saved updated src/propertyDetails.json');
