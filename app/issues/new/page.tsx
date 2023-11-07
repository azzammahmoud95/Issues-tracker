'use client';


import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField,Button } from '@radix-ui/themes'
export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Title'/>
        </TextField.Root>
          <SimpleMDE />
        <Button>Submit New Issue</Button>
    </div>
  )
}
