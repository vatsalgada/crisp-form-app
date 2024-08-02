"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner10 } from "react-icons/im";
import { Button } from './ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {  useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Form } from './ui/form'

const formSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
})

type formSchemaType = z.infer<typeof formSchema>;



export default function CreateFormBtn() {

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: formSchemaType){
        console.log(values)
    }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button>Create new form</Button>
        </DialogTrigger>
        <DialogContent>

      
        <DialogHeader>
            <DialogTitle>
                Create form
            </DialogTitle>
            <DialogDescription>
                Create a new form to start collecting responses
            </DialogDescription>
        </DialogHeader>
            <div className='flex flex-col gap-4  '></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}> 
                    <FormField 
                    control={form.control} 
                    name='name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                        <FormControl>
                            <Input {...field } />
                        </FormControl>
                        <FormMessage></FormMessage>
                        </FormItem>
   ) }></FormField>

<FormField 
                    control={form.control} 
                    name='description'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                        <FormControl>
                            <Input {...field } />
                        </FormControl>
                        <FormMessage></FormMessage>
                        </FormItem>
   ) }></FormField>
                </form>
            </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
