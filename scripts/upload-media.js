const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .env.local
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
  // Si dotenv no está instalado, usar variable de entorno manual
  console.log('dotenv no encontrado, usando variables de entorno del sistema');
}

// Asegúrate de que tu token esté en las variables de entorno
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN no está configurado');
  console.error('Asegúrate de que .env.local existe y contiene BLOB_READ_WRITE_TOKEN');
  process.exit(1);
}

async function uploadFile(filePath, blobPath) {
  try {
    console.log(`📤 Subiendo ${filePath}...`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
    });

    console.log(`✅ Subido: ${fileName}`);
    console.log(`🔗 URL: ${blob.url}`);
    console.log('---');
    
    return blob;
  } catch (error) {
    console.error(`❌ Error subiendo ${filePath}:`, error.message);
    return null;
  }
}

async function uploadAllMedia() {
  console.log('🚀 Iniciando subida de archivos a Vercel Blob...\n');

  const mediaDir = path.join(__dirname, '../public/media');
  
  // Lista de archivos a subir
  const files = [
    // Imágenes principales
    { local: 'hero-imagen.png', blob: 'image/hero-imagen.png' },
    { local: 'about-estilo.png', blob: 'image/about-estilo.png' },
    { local: 'about-trabajo.png', blob: 'image/about-trabajo.png' },
    
    // Imágenes de tabs
    { local: 'tab-imagenes-1.png', blob: 'image/tab-imagenes-1.png' },
    { local: 'tab-imagenes-2.png', blob: 'image/tab-imagenes-2.png' },
    { local: 'tab-imagenes-3.png', blob: 'image/tab-imagenes-3.png' },
    { local: 'tab-imagenes-4.png', blob: 'image/tab-imagenes-4.png' },
    { local: 'tab-imagenes-5.png', blob: 'image/tab-imagenes-5.png' },
    { local: 'tab-imagenes-6.png', blob: 'image/tab-imagenes-6.png' },
    
    // GIFs
    { local: 'tab-gif-1.gif', blob: 'gif/tab-gif-1.gif' },
    { local: 'tab-gif-2.gif', blob: 'gif/tab-gif-2.gif' },
    { local: 'tab-gif-3.gif', blob: 'gif/tab-gif-3.gif' },
  ];

  for (const file of files) {
    const localPath = path.join(mediaDir, file.local);
    
    if (fs.existsSync(localPath)) {
      await uploadFile(localPath, file.blob);
    } else {
      console.log(`⚠️  Archivo no encontrado: ${file.local}`);
    }
  }

  console.log('\n🎉 ¡Subida completada!');
}

// Ejecutar el script
uploadAllMedia().catch(console.error);