import fs from 'fs';
import path from 'path';

function checkBuild() {
  const distPath = './dist';
  if (!fs.existsSync(distPath)) {
    console.log('dist directory does not exist');
    return;
  }
  const items = fs.readdirSync(distPath);
  console.log('Contents of dist:', items);
  
  const propertiesPath = path.join(distPath, 'properties');
  if (fs.existsSync(propertiesPath)) {
    const files = fs.readdirSync(propertiesPath);
    console.log(`Total files in dist/properties: ${files.length}`);
  } else {
    console.log('dist/properties directory DOES NOT EXIST');
  }

  const portfolioPath = path.join(distPath, 'portfolio');
  if (fs.existsSync(portfolioPath)) {
    const files = fs.readdirSync(portfolioPath);
    console.log(`Total files in dist/portfolio: ${files.length}`);
  } else {
    console.log('dist/portfolio directory DOES NOT EXIST');
  }
}

checkBuild();
