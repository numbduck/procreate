"use client";

import { useThemeContext } from '@/context/ThemeContext';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { toggleTheme } = useThemeContext();
  const { data: session } = useSession(); // ⬅️ Fetch session data

  const handleLogout = () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div >
      {/* Top Nav */}
      <header className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">ProCREATE</h1>

          <nav className="flex gap-8 text-sm font-medium">
            {session?.user?.role === "admin" && (
              <Link
                href="/dashboard"
                className={`transition-all border-b-2 pb-1 ${
                  isActive("/dashboard")
                    ? "border-yellow-400 text-yellow-300"
                    : "border-transparent hover:text-yellow-300"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/products"
              className={`transition-all border-b-2 pb-1 ${
                isActive("/products")
                  ? "border-yellow-400 text-yellow-300"
                  : "border-transparent hover:text-yellow-300"
              }`}
            >
              Products
            </Link>

          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleLogout}
              sx={{
                backgroundColor: '#f44336',
                '&:hover': { backgroundColor: '#d32f2f' },
              }}
            >
              Logout
            </Button>

            <FormControlLabel
              control={<Switch onChange={toggleTheme} />}
              label="Light Mode"
              sx={{ color: 'white', fontSize: "8px" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}

export default MainLayout;
