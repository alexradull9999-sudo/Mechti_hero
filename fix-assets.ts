import fs from 'fs';
import path from 'path';

const PUBLIC_SAYT_DIR = './public/сайт';
const PUBLIC_SITE_DIR = './public/site';
const DATA_FILE = './src/data.ts';
const PROPERTY_DETAILS_FILE = './src/propertyDetails.json';

function fixAssets() {
  console.log('--- Fixing assets and replacing .avif with .jpg ---');

  // 1. Copy original JPGs from public/сайт to public/site
  if (fs.existsSync(PUBLIC_SAYT_DIR)) {
    console.log(`Found original folder: ${PUBLIC_SAYT_DIR}. Copying files...`);
    const files = fs.readdirSync(PUBLIC_SAYT_DIR);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg')) {
        const srcPath = path.join(PUBLIC_SAYT_DIR, file);
        const destPath = path.join(PUBLIC_SITE_DIR, file);
        try {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied ${file} from ${PUBLIC_SAYT_DIR} to ${PUBLIC_SITE_DIR}`);
        } catch (err: any) {
          console.error(`Failed to copy ${file}:`, err.message);
        }
      }
    }
  } else {
    console.log(`[WARNING] Original folder ${PUBLIC_SAYT_DIR} not found.`);
  }

  // 2. Replace .avif with .jpg in src/data.ts
  if (fs.existsSync(DATA_FILE)) {
    let dataContent = fs.readFileSync(DATA_FILE, 'utf8');
    
    // Look for occurrences like /site/a-XXXX.avif and replace with .jpg
    const avifRegex = /\/site\/a-(\d+)\.avif/g;
    if (avifRegex.test(dataContent)) {
      dataContent = dataContent.replace(avifRegex, '/site/a-$1.jpg');
      fs.writeFileSync(DATA_FILE, dataContent, 'utf8');
      console.log(`Successfully replaced .avif with .jpg in ${DATA_FILE}`);
    } else {
      console.log(`No .avif references matching /site/a-XXXX.avif in ${DATA_FILE}`);
    }
  } else {
    console.error(`Data file not found at ${DATA_FILE}`);
  }

  // 3. Replace .avif with .jpg in src/propertyDetails.json
  if (fs.existsSync(PROPERTY_DETAILS_FILE)) {
    let detailsContent = fs.readFileSync(PROPERTY_DETAILS_FILE, 'utf8');
    
    const avifRegex = /\/site\/a-(\d+)\.avif/g;
    if (avifRegex.test(detailsContent)) {
      detailsContent = detailsContent.replace(avifRegex, '/site/a-$1.jpg');
      fs.writeFileSync(PROPERTY_DETAILS_FILE, detailsContent, 'utf8');
      console.log(`Successfully replaced .avif with .jpg in ${PROPERTY_DETAILS_FILE}`);
    } else {
      console.log(`No .avif references matching /site/a-XXXX.avif in ${PROPERTY_DETAILS_FILE}`);
    }
  } else {
    console.error(`Property details file not found at ${PROPERTY_DETAILS_FILE}`);
  }

  console.log('--- Asset fix completed ---');
}

fixAssets();
