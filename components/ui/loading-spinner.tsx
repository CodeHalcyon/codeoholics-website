export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>
    </div>
  )
}
