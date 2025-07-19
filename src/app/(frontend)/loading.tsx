import LoadingComponent from '@/components/LoadingComponent'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <LoadingComponent />
    </div>
  )
}
