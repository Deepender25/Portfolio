import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Path to the resume file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'Deepender_Yadav_Resume.pdf')
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return NextResponse.json({ error: 'Resume file not found' }, { status: 404 })
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath)
    
    // Create response with proper headers
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Deepender_Yadav_Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    })

    return response
  } catch (error) {
    console.error('Error serving resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
