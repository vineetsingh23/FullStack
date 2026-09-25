import React from 'react'
// import { Button } from './ui/button'
import {Button, Card} from './uiDesign/button'
import { Button as Btn } from './ui/button';
import { Card as MyCard,CardHeader,CardTitle,CardDescription,CardFooter,CardContent } from './ui/card';


export default function Registration() {
  return (
    <div className='flex justify-center flex-col w-md items-center'>
        <h1>Registration Form</h1>
        <Button>Register</Button>
<MyCard className='min-w-sm text-center'>
        <CardHeader className='font-bold text-lg border bg-gray-200'>
            This is Header
        </CardHeader>
       <CardTitle>Title</CardTitle>
       <CardDescription>
        this is about the CardDescription
       </CardDescription>
       <CardContent>this is card content</CardContent>
       <CardFooter>
        <Btn>button1</Btn>
        <Btn>button2</Btn>
       </CardFooter>
</MyCard>

        
    </div>
  )
}
