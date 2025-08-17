const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
  console.log('dotenv no encontrado, usando variables de entorno del sistema');
}

async function uploadAudio(audioPath, audioName) {
  try {
    console.log(`🎵 Subiendo ${audioPath}...`);
    
    const fileBuffer = fs.readFileSync(audioPath);
    const extension = path.extname(audioPath).toLowerCase();
    
    let contentType = 'audio/mpeg';
    if (extension === '.wav') contentType = 'audio/wav';
    if (extension === '.ogg') contentType = 'audio/ogg';
    if (extension === '.m4a') contentType = 'audio/mp4';
    
    const blob = await put(`audio/${audioName}`, fileBuffer, {
      access: 'public',
      contentType
    });

    console.log(`✅ Audio subido: ${audioName}`);
    console.log(`🔗 URL: ${blob.url}`);
    
    return blob;
  } catch (error) {
    console.error(`❌ Error subiendo audio:`, error.message);
    return null;
  }
}

// Usar: node scripts/upload-audio.js ruta/al/audio.mp3 nombre-audio.mp3
const audioPath = process.argv[2];
const audioName = process.argv[3] || path.basename(audioPath);

if (!audioPath) {
  console.log('Uso: node scripts/upload-audio.js ruta/al/audio.mp3 [nombre-opcional.mp3]');
  process.exit(1);
}

if (!fs.existsSync(audioPath)) {
  console.error(`❌ El archivo ${audioPath} no existe`);
  process.exit(1);
}

uploadAudio(audioPath, audioName);