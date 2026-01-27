'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
  value: string
  onSave: (value: string) => void
  placeholder?: string
  className?: string
  editClassName?: string
  multiline?: boolean
  rows?: number
}

export default function EditableText({
  value,
  onSave,
  placeholder = 'Click to edit...',
  className = '',
  editClassName = '',
  multiline = false,
  rows = 3,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = async () => {
    const trimmedValue = editValue.trim()
    if (trimmedValue !== value) {
      setIsSaving(true)
      try {
        await onSave(trimmedValue)
      } catch (error) {
        console.error('Failed to save:', error)
        setEditValue(value) // Revert to original value on error
      } finally {
        setIsSaving(false)
      }
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    const inputClasses = `w-full px-2 py-1 border-2 border-[#0720ff] rounded outline-none bg-white ${editClassName}`

    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          rows={rows}
          className={inputClasses}
          disabled={isSaving}
        />
      )
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        disabled={isSaving}
      />
    )
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-[#0720ff]/10 hover:outline hover:outline-2 hover:outline-[#0720ff]/30 rounded px-1 -mx-1 transition-all ${className}`}
      title="Click to edit"
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
    </span>
  )
}
