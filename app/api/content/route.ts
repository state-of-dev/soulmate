import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { content as defaultContent } from '@/lib/content'

const CONTENT_FILE = join(process.cwd(), 'lib/content-data.json')

export async function GET() {
  try {
    const content = await readFile(CONTENT_FILE, 'utf8')
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    return NextResponse.json(defaultContent)
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' }, 
      { status: 500 }
    )
  }
}
