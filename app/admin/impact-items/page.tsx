'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EditableImpactCell from '@/components/admin/EditableImpactCell'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import type { ImpactItem } from '@/db/schema'

export default function ImpactItemsPage() {
  const router = useRouter()
  const [items, setItems] = useState<ImpactItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null)
  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null)
  const [isReordering, setIsReordering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setError(null)
      const response = await fetch('/api/admin/impact-items')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      } else {
        setError('Failed to load impact items. Please try again.')
      }
    } catch (error) {
      console.error('Failed to fetch items:', error)
      setError('Failed to load impact items. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (id: number, updates: Partial<ImpactItem>) => {
    try {
      const response = await fetch(`/api/admin/impact-items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updated = await response.json()
        setItems(items.map((item) => (item.id === id ? updated : item)))
      }
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/impact-items/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setItems(items.filter((item) => item.id !== deleteId))
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const handleAdd = async () => {
    setIsAdding(true)
    try {
      const nextOrder = items.length > 0
        ? Math.max(...items.map(i => i.displayOrder)) + 1
        : 0

      const response = await fetch('/api/admin/impact-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heading: 'New Item',
          description: ['Description line 1'],
          displayOrder: nextOrder,
        }),
      })

      if (response.ok) {
        const newItem = await response.json()
        setItems([...items, newItem])
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to add:', error)
    } finally {
      setIsAdding(false)
    }
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItemId(itemId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', itemId.toString())
  }

  const handleDragEnd = () => {
    setDraggedItemId(null)
    setDragOverItemId(null)
  }

  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (draggedItemId !== itemId) {
      setDragOverItemId(itemId)
    }
  }

  const handleDragLeave = () => {
    setDragOverItemId(null)
  }

  const handleDrop = async (e: React.DragEvent, targetItemId: number) => {
    e.preventDefault()
    setDragOverItemId(null)

    if (!draggedItemId || draggedItemId === targetItemId) {
      setDraggedItemId(null)
      return
    }

    // Find indices
    const draggedIndex = items.findIndex((item) => item.id === draggedItemId)
    const targetIndex = items.findIndex((item) => item.id === targetItemId)

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItemId(null)
      return
    }

    // Reorder items locally
    const newItems = [...items]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, draggedItem)

    // Update display orders
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      displayOrder: index,
    }))

    setItems(updatedItems)
    setDraggedItemId(null)

    // Save new order to database
    setIsReordering(true)
    try {
      // Update all items with their new display order
      await Promise.all(
        updatedItems.map((item) =>
          fetch(`/api/admin/impact-items/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayOrder: item.displayOrder }),
          })
        )
      )
      router.refresh()
    } catch (error) {
      console.error('Failed to save order:', error)
      // Revert on error
      fetchItems()
    } finally {
      setIsReordering(false)
    }
  }

  // Group items into rows of 3
  const rows: (ImpactItem | 'add')[][] = []
  const allCells = [...items, 'add' as const]
  for (let i = 0; i < allCells.length; i += 3) {
    rows.push(allCells.slice(i, i + 3))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => {
            setIsLoading(true)
            fetchItems()
          }}
          className="px-4 py-2 bg-[#0720ff] text-white rounded-full font-semibold hover:bg-[#0618dd] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Donations at Work
        </h1>
        <p className="text-gray-600 text-sm">
          Click any text to edit. Drag items to reorder. Changes are saved automatically.
        </p>
      </div>

      {/* Visual Preview Banner */}
      <div className="bg-[#e1e2f8] rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-[#0720ff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="text-[#0720ff] font-medium text-sm">
            Visual Editor - This matches how it appears on the homepage
          </span>
        </div>
        {isReordering && (
          <div className="flex items-center gap-2 text-[#0720ff] text-sm">
            <div className="w-4 h-4 border-2 border-[#0720ff]/30 border-t-[#0720ff] rounded-full animate-spin" />
            Saving order...
          </div>
        )}
      </div>

      {/* Impact Grid - mirrors frontend ImpactGrid.tsx */}
      <div className="bg-[#f7f7f7] rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold pb-2 border-b-4 border-[#0720ff] inline-block">
            Your Donations at Work
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell) => {
                    if (cell === 'add') {
                      return (
                        <td key="add" className="p-6 align-middle">
                          <button
                            onClick={handleAdd}
                            disabled={isAdding}
                            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#0720ff] hover:text-[#0720ff] transition-colors disabled:opacity-50"
                          >
                            {isAdding ? (
                              <div className="w-6 h-6 border-2 border-gray-400 border-t-[#0720ff] rounded-full animate-spin" />
                            ) : (
                              <>
                                <svg
                                  className="w-8 h-8"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                                <span className="font-medium text-sm">
                                  Add New Item
                                </span>
                              </>
                            )}
                          </button>
                        </td>
                      )
                    }

                    return (
                      <EditableImpactCell
                        key={cell.id}
                        item={cell}
                        onUpdate={(updates) => handleUpdate(cell.id, updates)}
                        onDelete={() => setDeleteId(cell.id)}
                        isDragging={draggedItemId === cell.id}
                        isDragOver={dragOverItemId === cell.id}
                        onDragStart={(e) => handleDragStart(e, cell.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, cell.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, cell.id)}
                      />
                    )
                  })}
                  {/* Fill empty cells in the last row */}
                  {row.length < 3 &&
                    Array.from({ length: 3 - row.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-6"></td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No impact items yet. Click the + button above to add your first item.
        </div>
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Impact Item"
        message="Are you sure you want to delete this impact item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}
