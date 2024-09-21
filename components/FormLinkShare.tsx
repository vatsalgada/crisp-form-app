"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import { ImShare } from 'react-icons/im';
import { toast } from './ui/use-toast';

function FormLinkShare({shareUrl}: {shareUrl: string}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null //don't remove - avoid rehydration errors

    const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className='flex flex-grow gap-4 items-center'>
     <Input value={shareLink} readOnly></Input>
     <Button className='w-[250px]' onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: 'Copied!',
            description: 'Link copied to clipboard',
          })
     }} >
      <ImShare className='h-4 w-4 mr-2'/>
      Share link
     </Button>
    </div>
  )
}

export default FormLinkShare
