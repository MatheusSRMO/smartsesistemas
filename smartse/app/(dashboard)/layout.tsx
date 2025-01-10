import Topnav from '@/components/topnav'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <Topnav />
      <div className="container w-full max-w-screen-lg mx-auto ">
        {children}
      </div>
      {/* Footer */}
      <footer className="mt-auto bg-gray-100 p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} - Smartse Sistemas. Todos os direitos reservados.
      </footer>
    </div>
  )
}
