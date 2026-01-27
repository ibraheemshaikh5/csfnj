'use client'

import { useState } from 'react'
import EditableText from './EditableText'
import type { ImpactItem } from '@/db/schema'

type Props = {
  item: ImpactItem
  onUpdate: (updates: Partial<ImpactItem>) => Promise<void>
  onDelete: () => void
  // Drag and drop props
  isDragging?: boolean
  isDragOver?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: () => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
}

export default function EditableImpactCell({
  item,
  onUpdate,
  onDelete,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const showSavedFeedback = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 1000)
  }

  const handleHeadingChange = async (heading: string) => {
    if (heading && heading !== item.heading) {
      try {
        await onUpdate({ heading })
        showSavedFeedback()
      } catch (error) {
        console.error('Failed to update heading:', error)
      }
    }
  }

  const handleDescriptionChange = async (index: number, newValue: string) => {
    const newDescription = [...item.description]
    if (newValue.trim()) {
      newDescription[index] = newValue
    } else {
      // Remove empty lines
      newDescription.splice(index, 1)
    }
    if (JSON.stringify(newDescription) !== JSON.stringify(item.description)) {
      try {
        await onUpdate({ description: newDescription })
        showSavedFeedback()
      } catch (error) {
        console.error('Failed to update description:', error)
      }
    }
  }

  const handleAddLine = async () => {
    const newDescription = [...item.description, 'New line']
    try {
      await onUpdate({ description: newDescription })
      showSavedFeedback()
    } catch (error) {
      console.error('Failed to add line:', error)
    }
  }

  return (
    <td
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`p-6 align-top relative transition-all duration-200 ${
        isSaved ? 'bg-green-50' : ''
      } ${isDragging ? 'opacity-50 bg-gray-100' : ''} ${
        isDragOver ? 'bg-[#e1e2f8] outline outline-2 outline-[#0720ff] outline-dashed' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag handle */}
      <div
        className={`absolute top-2 left-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-[#0720ff] transition-all ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Drag to reorder"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        className={`absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-sm font-bold ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Delete item"
      >
        ×
      </button>

      {/* Saved indicator */}
      {isSaved && (
        <div className="absolute top-8 left-2 text-green-600 text-xs font-medium flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Saved
        </div>
      )}

      {/* Heading */}
      <h3 className="font-bold text-lg mb-2 text-gray-900 mt-4">
        <EditableText
          value={item.heading}
          onSave={handleHeadingChange}
          placeholder="Enter heading..."
          className="font-bold text-lg"
        />
      </h3>

      {/* Description lines */}
      {item.description.map((desc, index) => (
        <p key={index} className="text-gray-700 text-sm mb-1 last:mb-0">
          <EditableText
            value={desc}
            onSave={(value) => handleDescriptionChange(index, value)}
            placeholder="Enter description..."
            className="text-sm"
          />
        </p>
      ))}

      {/* Add line button - visible on hover */}
      <button
        onClick={handleAddLine}
        className={`mt-2 text-xs text-[#0720ff] hover:underline transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        + Add line
      </button>
    </td>
  )
}
