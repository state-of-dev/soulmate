import { NextRequest, NextResponse } from 'next/server'
import { uploadMedia, MediaType } from '@/lib/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as MediaType
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!type || !['video', 'gif', 'image'].includes(type)) {
      return NextResponse.json({ error: 'Invalid media type' }, { status: 400 })
    }

    const mediaItem = await uploadMedia(file, file.name, type)
    
    return NextResponse.json({
      success: true,
      media: mediaItem
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    )
  }
}