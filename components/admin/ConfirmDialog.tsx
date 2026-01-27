'use client'

type Props = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
  confirmText?: string
  cancelText?: string
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-full font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
