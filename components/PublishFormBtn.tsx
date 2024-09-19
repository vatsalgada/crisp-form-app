import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from "react-icons/md";
import { AlertDialogAction, AlertDialogTrigger, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel } from './ui/alert-dialog';
import { FaSpinner } from 'react-icons/fa';
import { toast } from './ui/use-toast';
import { PublishForm } from '@/app/lib/actions/form';
import { useRouter } from 'next/navigation';

function PublishFormBtn({id}: {id: number}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Published",
        description: "Your form has been published",
        variant: "default",
      });
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <Button variant={'outline'} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
    <MdOutlinePublish  className='h-6 w-6'/>
    Publish
    </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
      <AlertDialogTitle>
        Are you sure?
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. After publishing, you will not be able to edit this form. <br /> <br />
        <span className='font-medium'>
          By publishing this form you will make it available to be public and you will be able to collect submissions.
        </span>
      </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction disabled={loading} onClick={(e) => {
          e.preventDefault();
          startTransition(publishForm)
        }}> Proceed {loading && <FaSpinner className='h-6 w-6 animate-spin'/>}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn
