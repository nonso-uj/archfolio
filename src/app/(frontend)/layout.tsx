import type { Metadata } from 'next'
import { ProgressBar, ProgressBarProvider } from 'react-transition-progress'
import { Toaster } from 'sonner'

import './globals.css'
import './font.css'

export const metadata: Metadata = {
  title: 'Archfolio',
  description: 'Next JS SaaS Starter Template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="relative h-full">
        <ProgressBarProvider>
          {/* I.e. using Tailwind CSS to show the progress bar with custom styling */}
          <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0 z-50" />
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
        </ProgressBarProvider>
      </body>
    </html>
  )
}
