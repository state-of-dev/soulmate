const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
  console.log('dotenv no encontrado, usando variables de entorno del sistema');
}

async function uploadThumbnail(imagePath, thumbnailName) {
  try {
    console.log(`🖼️  Subiendo thumbnail ${imagePath}...`);
    
    const fileBuffer = fs.readFileSync(imagePath);
    const extension = path.extname(imagePath).toLowerCase();
    
    let contentType = 'image/jpeg';
    if (extension === '.png') contentType = 'image/png';
    if (extension === '.webp') contentType = 'image/webp';
    
    const blob = await put(`image/${thumbnailName}`, fileBuffer, {
      access: 'public',
      contentType
    });

    console.log(`✅ Thumbnail subido: ${thumbnailName}`);
    console.log(`🔗 URL: ${blob.url}`);
    
    return blob;
  } catch (error) {
    console.error(`❌ Error subiendo thumbnail:`, error.message);
    return null;
  }
}

// Usar: node scripts/upload-thumbnail.js ruta/al/thumbnail.jpg video-thumbnail.jpg
const imagePath = process.argv[2];
const thumbnailName = process.argv[3] || 'video-thumbnail.jpg';

if (!imagePath) {
  console.log('Uso: node scripts/upload-thumbnail.js ruta/al/thumbnail.jpg [nombre-opcional.jpg]');
  process.exit(1);
}

if (!fs.existsSync(imagePath)) {
  console.error(`❌ El archivo ${imagePath} no existe`);
  process.exit(1);
}

uploadThumbnail(imagePath, thumbnailName);