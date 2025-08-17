import { NextRequest, NextResponse } from 'next/server'
import { listMedia, deleteMedia, MediaType } from '@/lib/blob'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as MediaType | null
    
    const media = await listMedia(type || undefined)
    
    return NextResponse.json({
      success: true,
      media
    })
  } catch (error) {
    console.error('List media error:', error)
    return NextResponse.json(
      { error: 'Failed to list media' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const success = await deleteMedia(url)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
    }
  } catch (error) {
    console.error('Delete media error:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' }, 
      { status: 500 }
    )
  }
}