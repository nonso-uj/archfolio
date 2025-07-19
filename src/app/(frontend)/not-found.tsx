'use client'

import { useParams } from 'next/navigation'
import { Link } from 'react-transition-progress/next'
import { routesFunc } from '@/utilities/routes'

export default function NotFound() {
  const params = useParams()
  const { slug = '' } = params

  // @ts-ignore
  const { HOME_PAGE } = routesFunc(slug)

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="w-screen h-screen flex flex-col items-center justify-center text-center text-white py-28 bg-black">
          <div className="prose max-w-none">
            <h1 className="text-5xl mb-2">404</h1>
            <p className="mb-4">This page could not be found.</p>
          </div>
          <button className="bg-white text-black px-5 py-2 rounded-3xl">
            <Link href={HOME_PAGE}>Go home</Link>
          </button>
        </div>
      </body>
    </html>
  )
}
