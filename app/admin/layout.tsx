import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, just render children (login page handles its own layout)
  // Middleware handles the actual redirect protection
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
