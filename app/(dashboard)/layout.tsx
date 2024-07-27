import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserButton from '@/components/UserButton';
import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className='flex flex-col  min-h-screen min-w-full bg-background max-h-screen'>
        <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <ThemeSwitcher /> 
        <UserButton></UserButton>
        </nav>
        <main className='flex w-full flex-grow'>
            { children }
        </main>
      
    </div>
  }
 

  //https://youtu.be/QGXUUXy0AMw?si=oD0agoMjyrgG4oY4&t=529

  //https://www.youtube.com/watch?v=zzWypOl4JkY


