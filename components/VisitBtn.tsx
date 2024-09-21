"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

function VisitBtn({shareUrl}: {shareUrl: string}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null //don't remove - avoid rehydration errors

    const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div>
      <Button className='w-[200px]' 
      onClick={() => window.open(shareLink, "_blank")}>Visit</Button>
    </div>
  )
}

export default VisitBtn
