import { GetFormContentByUrl } from '@/app/lib/actions/form';
import { FormElementInstance } from '@/components/FormElement';
import FormSubmitComponent from '@/components/FormSubmitComponent';
import React from 'react'

async function SubmitPage({params} : {params: {formUrl: string}}) {

    const form = await GetFormContentByUrl(params.formUrl);

    if(!form) {
        throw new Error("Form not found");
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[] ;
    
  return (

     <FormSubmitComponent formUrl = {params.formUrl} content = {formContent} />
      
  )
}

export default SubmitPage
