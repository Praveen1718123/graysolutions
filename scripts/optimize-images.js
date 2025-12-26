import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = './attached_assets';
const outputDir = './attached_assets/optimized';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const largeImages = [
  'Eagle_Web_2_1765901229010.png',
  'Eagle_Wallpaper-02_1765901229017.png',
  'Eagle_Wallpaper-03_1765901229017.png',
  'Eagle_Tote_Bag_1765901229016.png',
  'Eagle_Container_1765901229016.png',
  'Eagle_web_elements-04_1765901229015.png',
  'Eagle_2_1765901229015.png',
  'Eagle_3_1765901229015.png',
  'mokcup_1_1765899763586.png',
  '54066314_updlaptop_screerns0008_1765899763583.png',
  'magic_trucks_neww-01_1765899763585.png',
  'Generated_Image_October_07,_2025_-_12_10PM_1765899763584.png',
  'Generated_Image_October_07,_2025_-_12_15PM_1765899763584.png',
  'Desktop_-_4_(2)_1765460573017.png',
  'Camera_Angle_02_1765901229015.png',
];

async function optimizeImage(filename) {
  const inputPath = path.join(assetsDir, filename);
  const outputFilename = filename.replace(/\.png$/i, '.jpg').replace(/\.PNG$/i, '.jpg');
  const outputPath = path.join(outputDir, outputFilename);

  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping ${filename} - file not found`);
    return;
  }

  try {
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`Processing ${filename} (${sizeMB}MB)...`);

    await sharp(inputPath)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
    console.log(`  -> Saved as ${outputFilename} (${newSizeMB}MB)`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err.message);
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  for (const image of largeImages) {
    await optimizeImage(image);
  }
  
  console.log('\nOptimization complete!');
}

main();
