"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Simple search component that filters through basic website content
export default function SimpleSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  // Basic website sections for searching
  const websiteSections = [
    { title: "Home", description: "Main landing page", url: "/" },
    { title: "About", description: "Learn about our community", url: "/#about" },
    { title: "Events", description: "Upcoming events and workshops", url: "/#events" },
    { title: "Projects", description: "Community projects showcase", url: "/#projects" },
    { title: "Team", description: "Meet our team members", url: "/#team" },
    { title: "Resources", description: "Learning resources and guides", url: "/resources" },
    { title: "Contact", description: "Get in touch with us", url: "/#contact" },
  ]

  // Simple search function
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const searchTerms = searchQuery.toLowerCase().split(" ")

    const filteredResults = websiteSections.filter((section) => {
      const titleMatch = searchTerms.some((term) => section.title.toLowerCase().includes(term))
      const descriptionMatch = searchTerms.some((term) => section.description.toLowerCase().includes(term))
      return titleMatch || descriptionMatch
    })

    setResults(filteredResults)
  }

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)} aria-label="Search website">
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Website</DialogTitle>
          </DialogHeader>

          <div className="flex items-center border rounded-md">
            <Search className="h-4 w-4 mx-2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search for pages..."
              className="border-0 focus-visible:ring-0"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 mx-1"
                onClick={() => {
                  setQuery("")
                  setResults([])
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((result, index) => (
                  <li key={index}>
                    <a
                      href={result.url}
                      className="block p-2 hover:bg-muted rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground">{result.description}</div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="text-center py-4 text-muted-foreground">No results found for "{query}"</div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">Type to search...</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
