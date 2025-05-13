import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-primary">Learning Resources</h1>

        <div className="prose prose-sm dark:prose-invert mb-8">
          <p className="text-foreground/80 mb-4">
            This page is currently under development. Soon, it will contain a comprehensive collection of learning
            resources for various programming languages, frameworks, and technologies.
          </p>

          <p className="text-foreground/80 mb-4">Our curated resources will include:</p>

          <ul className="space-y-2 list-disc list-inside text-foreground/80">
            <li>Beginner-friendly tutorials</li>
            <li>Advanced programming guides</li>
            <li>Recommended books and courses</li>
            <li>Interactive coding challenges</li>
            <li>Project ideas for practice</li>
            <li>Community-contributed resources</li>
          </ul>

          <p className="text-foreground/80 mt-4">
            Check back soon for updates, or join our community to contribute to this resource collection!
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="group" asChild>
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
