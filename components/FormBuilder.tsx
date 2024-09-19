"use client"

import { Form } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import PublishFormBtn from './PublishFormBtn'
import SaveFormBtn from './SaveFormBtn'
import Designer from './Designer'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'
import useDesigner from './hooks/useDesigner'
import { ImSpinner2 } from 'react-icons/im'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import Link from 'next/link'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Confetti from "react-confetti"

function FormBuilder({form} : {form: Form}) {
  const {setElements} = useDesigner();
  const  [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    if(isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    const readyTimeout = setTimeout(() => {
      setIsReady(true),500 ;
    });
    return () => clearTimeout(readyTimeout);
  
  }, [form, setElements])


  if(!isReady) {
    return <div className='w-full h-full flex flex-col items-center justify-center'><ImSpinner2 className='animate-spin h-12 w-12' /></div>
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`
  

  if(form.published){
    return (<>
    <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} className='h-screen overflow-hidden'/>
    <div className=' flex flex-col items-center justify-center  h-full w-full overflow-x-hidden'>
      <div className='max-w-md overflow-hidden'>
      <h1 className='text-center text-3xl font-bold text-primary border-b pb-10 mb-10'>🎊🎊Form Published🎊🎊</h1>
      <h2 className='text-xl'>Share this form</h2>
      <h3 className='text-l text-muted-foreground border-b pb-10'> Anyone with a link can view and submit this form</h3>
      <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
        <Input className='w-full  max-w-full' readOnly value={shareUrl} />
        <Button className='mt-2 w-full' onClick={() =>{ navigator.clipboard.writeText(shareUrl)
          toast({description: 'Link copied to clipboard',
            title: 'Copied!',
         
          })
        }
        }>Copy link</Button>
      </div>
      <div className='flex justify-between w-full max-w-full'>
        <Button variant={'link'} asChild>
          <Link href={'/'} className='gap-2'>
            <BsArrowLeft />
            Go back home
          </Link>
        </Button>
        <Button variant={'link'} asChild className=''>
          <Link href={`/forms/${form.id}`} className='gap-2'>
          Form details
          <BsArrowRight />
          </Link>
        </Button>
      </div>
      </div>
      </div>
      </>)
  }

  return (
    <DndContext sensors={sensors}>    <main className='flex flex-col w-full'>
        <div className='flex justify-between border-b-2 p-4 gap-3 items-center'> 
            <h2 className='truncate font-medium'>
                <span className='mr-2'>Form: </span>
              {form.name}</h2>
             
                    <div className='flex items-center gap-2'>
                  <PreviewDialogBtn />  
                  {!form.published && (
                    <>
                        <SaveFormBtn id={form.id}/>
                        <PublishFormBtn id={form.id}/>
                    </>
                  )}
                    </div>
        </div>
        <div className='flex w-full flex-grow items-center justify-center
        relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
            <Designer></Designer>
        </div>
    </main>
    <DragOverlayWrapper />
    </DndContext>

  )
}

export default FormBuilder
