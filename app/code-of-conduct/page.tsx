import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CodeOfConductPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-primary">Code of Conduct</h1>

        <div className="prose prose-sm dark:prose-invert mb-8">
          <p className="text-foreground/80 mb-4">
            At Codeoholics, we are committed to providing a friendly, safe, and welcoming environment for all,
            regardless of gender, sexual orientation, ability, ethnicity, socioeconomic status, and religion (or lack
            thereof).
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Our Standards</h2>
          <p className="text-foreground/80 mb-4">
            Examples of behavior that contributes to creating a positive environment include:
          </p>

          <ul className="space-y-2 list-disc list-inside text-foreground/80">
            <li>Using welcoming and inclusive language</li>
            <li>Being respectful of differing viewpoints and experiences</li>
            <li>Gracefully accepting constructive criticism</li>
            <li>Focusing on what is best for the community</li>
            <li>Showing empathy towards other community members</li>
          </ul>

          <p className="text-foreground/80 mt-4">
            This page is a placeholder. A complete Code of Conduct will be published soon.
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
