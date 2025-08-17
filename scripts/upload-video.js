const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
  console.log('dotenv no encontrado, usando variables de entorno del sistema');
}

async function uploadVideo(videoPath, videoName) {
  try {
    console.log(`📹 Subiendo ${videoPath}...`);
    
    const fileBuffer = fs.readFileSync(videoPath);
    
    const blob = await put(`video/${videoName}`, fileBuffer, {
      access: 'public',
      contentType: 'video/mp4'
    });

    console.log(`✅ Video subido: ${videoName}`);
    console.log(`🔗 URL: ${blob.url}`);
    
    return blob;
  } catch (error) {
    console.error(`❌ Error subiendo video:`, error.message);
    return null;
  }
}

// Usar: node scripts/upload-video.js ruta/al/video.mp4 nombre-video.mp4
const videoPath = process.argv[2];
const videoName = process.argv[3] || path.basename(videoPath);

if (!videoPath) {
  console.log('Uso: node scripts/upload-video.js ruta/al/video.mp4 [nombre-opcional.mp4]');
  process.exit(1);
}

uploadVideo(videoPath, videoName);