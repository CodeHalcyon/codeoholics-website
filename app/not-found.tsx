import Link from "next/link"
import { ArrowLeft, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative p-4 bg-primary/10 rounded-full">
            <Code className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-foreground/70 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>

        <div className="flex justify-center">
          <Button className="group" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
