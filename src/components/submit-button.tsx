'use client'
 
import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({ text = "Add" }: { text?: string }) {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {text}
    </Button>
  )
}