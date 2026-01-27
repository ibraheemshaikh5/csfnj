import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif']

export async function POST(request: Request) {
  // Check authentication
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use service role for storage operations
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
      { status: 400 }
    )
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File size must be less than 5MB' },
      { status: 400 }
    )
  }

  // Extract and validate file extension
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return NextResponse.json(
      { error: 'Invalid file extension. Only jpg, jpeg, png, webp, and gif are allowed.' },
      { status: 400 }
    )
  }

  // Generate unique filename with validated extension
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const filename = `${timestamp}-${randomString}.${extension}`

  // Upload to Supabase Storage
  const { data, error } = await supabaseAdmin.storage
    .from('events')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from('events').getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
