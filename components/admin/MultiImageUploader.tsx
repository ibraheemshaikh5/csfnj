'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

type Props = {
  values: string[]
  onChange: (urls: string[]) => void
}

export default function MultiImageUploader({ values, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)

    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: File size must be less than 5MB`)
        continue
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name}: Only JPEG, PNG, WebP, and GIF images are allowed`)
        continue
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Upload failed')
        }

        const { url } = await response.json()
        newUrls.push(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      }
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls])
    }

    setIsUploading(false)
    // Reset input so the same files can be selected again
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index)
    onChange(newValues)
  }

  return (
    <div className="space-y-3">
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
            >
              <Image src={url} alt={`Image ${index + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-sm font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleUpload}
        multiple
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="px-4 py-2 bg-[#e1e2f8] text-[#0720ff] rounded-lg font-medium hover:bg-[#d1d2e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Uploading...' : '+ Add Images'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
