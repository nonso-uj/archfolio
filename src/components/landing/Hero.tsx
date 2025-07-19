import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="text-center h-auto max-h-screen overflow-hidden my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
      <h1 className="font-sans text-3xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl dark:text-white mb-6">
        Showcase Your Creative Journey. Beautifully.
      </h1>
      <p className="lg:w-3/4 mx-auto text-xl text-gray-600 dark:text-gray-300 mb-12 font-light bg-white/35 dark:bg-transparent shadow-xl shadow-white/35 dark:shadow-none p-5">
        A fast, no-code portfolio builder made for architecture students, design creatives, and
        anyone who wants to present their work with impact.
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          href="/signup"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Create Your Portfolio
        </Link>
        <Link
          href="/casa"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          See Sample Portfolio
        </Link>
      </div>

      <div className='flex flex-center justify-center mt-8 w-full overflow-hidden'>
        <Image
          src={'/img/admin-screenshot.webp'}
          className='rounded-t-3xl'
          alt="Hero image"
          width={1248}
          height={500}
          placeholder="blur"
          blurDataURL={'/img/blur.png'}
        />
      </div>
    </section>
  )
}
