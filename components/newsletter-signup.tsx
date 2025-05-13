"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Simple form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export default function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Newsletter signup:", data)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        reset()
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Newsletter signup error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-muted/30 p-6 rounded-lg border border-border/50">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground text-sm">Subscribe to our newsletter for the latest events and updates.</p>
      </div>

      {isSuccess ? (
        <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex space-x-2">
              <Input
                placeholder="Your email address"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className="flex-1"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </form>
      )}
    </div>
  )
}
