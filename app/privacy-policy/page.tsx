import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full bg-background/80 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>

        <div className="prose prose-sm dark:prose-invert mb-8">
          <p className="text-foreground/80 mb-4">
            This Privacy Policy page is currently a placeholder. We are working on a comprehensive privacy policy that
            will outline how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">What to Expect</h2>
          <p className="text-foreground/80 mb-4">Our privacy policy will cover:</p>

          <ul className="space-y-2 list-disc list-inside text-foreground/80">
            <li>What personal information we collect</li>
            <li>How we use your information</li>
            <li>How we protect your data</li>
            <li>Your rights regarding your personal information</li>
            <li>Our cookie policy</li>
            <li>How to contact us with privacy concerns</li>
          </ul>

          <p className="text-foreground/80 mt-4">
            We are committed to transparency and protecting your privacy. Check back soon for our complete privacy
            policy.
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
