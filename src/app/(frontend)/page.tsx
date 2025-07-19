import Image from 'next/image'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Section from '@/components/landing/Section'
import Footer from '@/components/landing/Footer'
import Customers from '@/components/landing/Customers'
import Accordion from '@/components/landing/Accordion'
import Reviews from '@/components/landing/Reviews'
import Download from '@/components/landing/Download'

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        className="flex flex-col min-h-screen bg-white dark:bg-black bg-cover bg-center bg-opacity-10"
        style={{ backgroundImage: "url('/img/home-bg.png')" }}
      >
        <Header />
        <main>
          <Hero />

          <div className="bg-gray-50 dark:bg-black w-full lg:container mx-auto mb-20 lg:rounded-3xl shadow-2xl shadow-white/40 border-2 border-black">
            <Section
              leftHalf={<Accordion />}
              rightHalf={
                <div className="flex flex-col justify-end">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                    How It Works
                  </h2>
                  <p className="text-xl font-light">
                    Create your portfolio in minutes. Just sign up, add your work, and share your
                    custom site, it's that simple.
                  </p>
                </div>
              }
            />
          </div>

          <Features />

          {/* <Customers /> */}

          <Reviews />

          {/* <Section
            leftHalf={
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                  Effortlessly highlight the key features of your app
                </h2>
                <p className="text-xl font-light">
                  Our app makes it easy to showcase your key features. With customizable sections,
                  you can highlight the most important aspects of your product. More to come.
                </p>
              </>
            }
            rightHalf={
              <Image
                src={'/products/phone.png'}
                alt="section-image"
                width={500}
                height={100}
                className="w-1/2 h-auto"
              />
            }
          /> */}

          <Download />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
