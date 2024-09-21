import { GetFormContentByUrl } from '@/app/lib/actions/form';
import React from 'react'

async function SubmitPage({params} : {params: {formUrl: string}}) {

    const form = await GetFormContentByUrl(params.formUrl);

    if(!form) {
        throw new Error("Form not found");
    }
  return (
    <div>
      SubmitPage: {params.formUrl}
    </div>
  )
}

export default SubmitPage
