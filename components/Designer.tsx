"use client"
import React from 'react'
import DesignerSidebar from './DesignerSidebar'
import {useDroppable} from '@dnd-kit/core'
import { cn } from '@/lib/utils'
function Designer() {
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true
        }
    })
  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div className={cn('bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
        )}>
            <p className='text-3xl flex flex-grow items-center font-bold'>
                Drop here
            </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>  
  )
}

export default Designer
