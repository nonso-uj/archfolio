import { Toaster } from 'sonner'
import './globals.css'
import './font.css'


export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="relative">
        <main className="custom-scroll font_regular">
          {children}
          <Toaster />
        </main>
        <div className="absolute bottom-0 right-0 z-50 bg-black text-center py-1 px-5 mr-5">
          <a
            href="https://nonsoportfolio.netlify.app/"
            target="_blank"
            className="font_semibold text-white text-xs"
          >
            Developed by <span className="underline">Nonso</span> :) ↗
          </a>
        </div>
      </body>
    </html>
  )
}
