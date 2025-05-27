"use client"

import { useThemeContext } from '@/context/ThemeContext';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { signOut } from 'next-auth/react';
import React from 'react';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {

  const { toggleTheme, mode } = useThemeContext();



  const handleLogout = () => {
    signOut({ callbackUrl: '/', redirect: true })
  }
  return (
    <div><div className='bg-blue-400 h-[5.5rem] flex justify-between z-50 items-start p-2 sticky top-0 pl-10'>
        <h1 className="text-2xl font-semibold flex gap-x-2 col-span-2 h-full items-center text-white ">ProCREATE </h1>
        {/* <div className="flex-auto px-10 ml-0 relative pt-16 pb-5 w-full col-span-6">
          <div className="flex items-center space-x-5 justify-start absolute transform -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 mt-5">
            {statsData.map((s) => (
              <StatCard key={s.id} title={s.title} stat={s.stat} />
            ))}
          </div>
        </div> */}
        <div className="flex gap-x-4 col-span-2 h-full items-center">
          <Button variant="contained"
          size="small"
          color="primary" onClick={handleLogout}>Logout</Button>
          <FormControlLabel control={<Switch
            onChange={toggleTheme} />} label="Dark Mode" />
        </div>
      </div>{children}</div>
  )
}

export default MainLayout