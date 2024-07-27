"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function UserButton() {
  return (
    <div>
      <DropdownMenu>
  <DropdownMenuTrigger>A</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link href={'/api/auth/signin'} onClick={() => signOut()}><DropdownMenuItem>Logout</DropdownMenuItem></Link>
    <Link href={'/api/auth/signin'} ><DropdownMenuItem>Signin</DropdownMenuItem></Link>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}
