import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSave } from "react-icons/hi";
import useDesigner from './hooks/useDesigner';
import { UpdateFormComponent } from '@/app/lib/actions/form';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';


function SaveFormBtn({id}:{id: number} ) {
  const {elements} = useDesigner();

  const [loading, startTransition] = useTransition();


  const updateFormComponenet = async () => {
    try {
      const JsonElements = JSON.stringify(elements);

      await UpdateFormComponent( id, JsonElements);
      toast({
        title: "Saved",
        description: "Your form has been saved",
        variant: "default",
      })
      localStorage.setItem("formElements", JsonElements);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }
  return (
    <Button variant={'outline'} className='gap-2' disabled={loading} onClick={() => startTransition(updateFormComponenet)}>
        <HiSave  className='h-6 w-6'/>
        Save
        {loading && <FaSpinner className='h-6 w-6 animate-spin'/>}
    </Button>
  )
}

export default SaveFormBtn
