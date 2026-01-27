'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type Props = {
  user: User
}

export default function AdminHeader({ user }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Failed to sign out:', error)
      // Still redirect even on error to clear local state
      router.push('/admin/login')
    }
  }

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">
        Care & Share Foundation
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-[#0720ff] font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}
