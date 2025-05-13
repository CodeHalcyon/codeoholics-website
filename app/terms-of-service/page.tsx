import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-primary">Terms of Service</h1>

        <div className="prose prose-sm dark:prose-invert mb-8">
          <p className="text-foreground/80 mb-4">
            This Terms of Service page is currently a placeholder. We are developing a comprehensive terms of service
            agreement that will outline the rules, guidelines, and legal terms for using our platform and services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">What to Expect</h2>
          <p className="text-foreground/80 mb-4">Our terms of service will cover:</p>

          <ul className="space-y-2 list-disc list-inside text-foreground/80">
            <li>User responsibilities and conduct</li>
            <li>Intellectual property rights</li>
            <li>Content guidelines</li>
            <li>Account termination policies</li>
            <li>Limitation of liability</li>
            <li>Dispute resolution procedures</li>
          </ul>

          <p className="text-foreground/80 mt-4">
            We are committed to creating fair and transparent terms that protect both our users and our organization.
            Check back soon for our complete terms of service.
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
