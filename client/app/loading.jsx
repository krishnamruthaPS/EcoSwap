export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-ping rounded-full bg-primary/20"></div>
        </div>
      </div>
    </div>
  )
}