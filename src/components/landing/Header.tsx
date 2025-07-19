import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'
import logo from '@/../public/img/wide.webp'

export default function Header() {
  return (
    <header className="fixed top-5 left-0 right-0 w-11/12 lg:w-4/5 mx-auto rounded-3xl bg-black shadow-sm border-2 border-gray-300 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} width={140} height={40} alt="Archfolio logo" />
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-2 mr-2">
            <li>
              <Link
                href="/signup"
                className="text-sm text-white px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-600 transition-colors"
              >
                Signup
              </Link>
            </li>
          </ul>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  )
}
