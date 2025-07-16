'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { MagneticFramer } from '../framer'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import { routesFunc } from '@/utilities/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NavBar = ({ extraClasses, userSlug }: { extraClasses: string; userSlug: any }) => {
  const [hoverRotate, setHoverRotate] = useState(false)
  const pathname = usePathname()

  const { HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, WORKS_PAGE } = routesFunc(userSlug)

  const variants: Variants = {
    visible: {
      opacity: 1,
      height: '100%',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      height: '0%',
      transition: {
        duration: 0.3,
        when: 'afterChildren',
      },
    },
    invisible: {
      opacity: 0,
      height: '0%',
      transition: {
        duration: 0.3,
      },
    },
  }

  const items: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div
      className={`w-full flex flex-row items-center justify-start lg:justify-between py-8 lg:py-8 ${extraClasses}`}
    >
      <motion.div>
        <MagneticFramer>
          <Link href={HOME_PAGE}>
            <motion.p
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => {
                setHoverRotate(true)
              }}
              onHoverEnd={() => {
                setHoverRotate(false)
              }}
              transition={{
                ease: 'easeInOut',
                duration: 0.4,
                type: 'spring',
                stiffness: 400,
                damping: 10,
              }}
              className="flex flex-row items-center justify-between gap-x-2  text-3xl lg:text-xl font-medium font_semibold"
            >
              <motion.svg
                animate={hoverRotate ? { rotate: 360 } : {}}
                exit={{ rotate: -360 }}
                transition={{ ease: 'easeInOut', duration: 0.4 }}
                fill={
                  [HOME_PAGE, CONTACT_PAGE, WORKS_PAGE].includes(pathname)
                    ? '#ffffff'
                    : pathname === ABOUT_PAGE
                      ? '#a3a3a3'
                      : '#000000'
                }
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 367.467 367.467"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    <motion.path d="M183.73,0.018C82.427,0.018,0,82.404,0,183.733c0,101.289,82.427,183.716,183.73,183.716 c101.315,0,183.737-82.427,183.737-183.716C367.467,82.404,285.045,0.018,183.73,0.018z M183.73,326.518 c-78.743,0-142.798-64.052-142.798-142.784c0-78.766,64.055-142.817,142.798-142.817c78.752,0,142.807,64.052,142.807,142.817 C326.536,262.466,262.481,326.518,183.73,326.518z"></motion.path>
                    <motion.path d="M244.036,217.014c-11.737,20.141-33.562,32.635-56.956,32.635c-36.329,0-65.921-29.585-65.921-65.915 c0-36.36,29.592-65.955,65.921-65.955c23.395,0,45.219,12.54,56.956,32.641l1.517,2.627h44.28l-2.658-7.129 c-7.705-20.413-21.225-37.769-39.122-50.157c-17.942-12.42-39.017-19.009-60.973-19.009c-58.981,0-106.946,48.006-106.946,106.982 c0,58.98,47.965,106.941,106.946,106.941c21.956,0,43.03-6.567,60.973-19.006c17.897-12.391,31.417-29.741,39.122-50.154 l2.658-7.133h-44.28L244.036,217.014z"></motion.path>{' '}
                  </g>{' '}
                </g>
              </motion.svg>

              <span className="hidden lg:block">
                Chinonso Udonne
                {/* Caleb Ojo */}
              </span>

              <span className="block lg:hidden">C.U</span>
            </motion.p>
          </Link>
        </MagneticFramer>
      </motion.div>

      <div className="hidden lg:flex flex-row items-center justify-between gap-x-10">
        <MagneticFramer
          showDots={true}
          dotsColor={
            [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, WORKS_PAGE].includes(pathname)
              ? 'text-white'
              : 'text-black'
          }
        >
          <Link href={ABOUT_PAGE}>
            <p className=" text-xl font-medium font_semibold">About</p>
          </Link>
        </MagneticFramer>
        <MagneticFramer
          showDots={true}
          dotsColor={
           [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, WORKS_PAGE].includes(pathname)
              ? 'text-white'
              : 'text-black'
          }
        >
          <Link href={WORKS_PAGE}>
            <p className=" text-xl font-medium font_semibold">Works</p>
          </Link>
        </MagneticFramer>
        <MagneticFramer
          showDots={true}
          dotsColor={
            [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, WORKS_PAGE].includes(pathname)
              ? 'text-white'
              : 'text-black'
          }
        >
          <Link href={CONTACT_PAGE}>
            <p className=" text-xl font-medium font_semibold">Contact</p>
          </Link>
        </MagneticFramer>
      </div>

      <div className="fixed top-5 right-5 w-fit h-fit block lg:hidden z-20">
        <Popover className="relative">
          {({ open }: { open: boolean }) => (
            <>
              <div
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-full duration-300 ease-in-out ${open ? 'bg-[#455CE9] scale-125' : 'bg-black'} ${pathname === WORKS_PAGE && 'border border-white'}`}
              >
                <PopoverButton
                  id="nav-icon3"
                  className={`relative w-2/5 h-2/5 p-0 rounded-full ${open && 'open'}`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </PopoverButton>
              </div>

              <PopoverPanel
                anchor="bottom"
                className={`flex flex-col items-center justify-start w-full h-full p-3 pt-10 ${pathname === CONTACT_PAGE && 'z-50'}`}
              >
                <AnimatePresence>
                  <motion.div
                    className={`w-full h-full flex flex-col items-start justify-start gap-y-8 pl-5 pt-10 bg-black text-white text-5xl text-bold font_bold ${pathname === WORKS_PAGE && 'bg-neutral-900'}`}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="invisible"
                    variants={variants}
                  >
                    <Link href={'/'}>
                      <motion.p
                        variants={items}
                        initial={'hidden'}
                        animate={'visible'}
                        className={`${pathname === HOME_PAGE && 'text-[#455CE9]'}`}
                      >
                        Home
                      </motion.p>
                    </Link>

                    <motion.hr className="border border-white w-full" variants={items} />

                    <Link href={ABOUT_PAGE}>
                      <motion.p
                        variants={items}
                        className={`${pathname === ABOUT_PAGE && 'text-[#455CE9]'}`}
                      >
                        About
                      </motion.p>
                    </Link>

                    <motion.hr className="border border-white w-full" variants={items} />

                    <Link href={WORKS_PAGE}>
                      <motion.p
                        variants={items}
                        className={`${pathname === WORKS_PAGE && 'text-[#455CE9]'}`}
                      >
                        Works
                      </motion.p>
                    </Link>

                    <motion.hr className="border border-white w-full" variants={items} />

                    <Link href={CONTACT_PAGE}>
                      <motion.p
                        variants={items}
                        className={`${pathname === CONTACT_PAGE && 'text-[#455CE9]'}`}
                      >
                        Contact
                      </motion.p>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </PopoverPanel>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}
