import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD env var is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (password?.trim() === adminPassword?.trim()) {
      return NextResponse.json({ success: true })
    }

    console.log('Admin Auth Failed:', { 
      receivedLength: password?.trim()?.length, 
      expectedLength: adminPassword?.trim()?.length 
    })

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
