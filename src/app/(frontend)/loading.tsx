import LoadingComponent from '@/components/LoadingComponent'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <LoadingComponent />
        </div>
      </body>
    </html>
  )
}
