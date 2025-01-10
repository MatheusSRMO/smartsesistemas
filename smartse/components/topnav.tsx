"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Topnav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo / Nome */}
        <div className="flex items-center gap-2">
          {/* Menu “hamburguer” */}
          <button onClick={toggleMobileMenu} className="lg:hidden p-2">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Logo ou Texto */}
          <Image src="/smartse.jpg" alt="Logo Smartse" width={150} height={40} />
        </div>

        {/* Menu principal (desktop) */}
        <nav className="hidden lg:flex gap-4">
          <Link href="/" className="hover:text-blue-700 transition-colors">
            Listar
          </Link>
          <Link href="/criar" className="hover:text-blue-700 transition-colors">
            Criar
          </Link>
        </nav>

        {/* Ações do usuário */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="relative">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18l-1 14H4L3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Modal do menu móvel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
          <div className="bg-white w-3/4 max-w-sm rounded shadow-lg p-4">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                href="/criar"
                className="hover:text-blue-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                Criar
              </Link>
              <Link
                href="/listar"
                className="hover:text-blue-700 transition-colors"
                onClick={toggleMobileMenu}
              >
                Listar
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
