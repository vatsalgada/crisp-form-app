"use client"

import { Form } from '@prisma/client'
import React from 'react'

function FormBuilder({form} : {form: Form}) {
  return (
    <main className='flex flex-col w-full'>
        <div className='flex justify-between border-b-2 p-4 gap-3 items-center'> 
            <div className='truncate font-medium'>
                <span className='mr-2'>Form: </span>
                {form.name}
                <h2>
                    <div className='flex items-center gap-2'>
                        {/* 1:07:00<PreviewDialogBtn />   */}
                    </div>
                </h2>
            </div>
        </div>
    </main>
  )
}

export default FormBuilder
