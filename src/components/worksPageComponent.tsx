'use client'

import { useRef } from 'react'
import Link from 'next/link'

import { motion, useScroll, useTransform } from 'motion/react'
import { routesFunc } from '@/utilities/routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WorksPageComponent = ({ slug, works }: { slug: string; works: any }) => {
  const targetRef = useRef(null)
  const { WORKS_PAGE } = routesFunc(slug || '')

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${50 - (0.5 / works.length) * 100}%`, `-${50 - (0.5 / works.length) * 100}%`],
  )

  return (
    <div ref={targetRef} className="relative scroll-smooth" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
        <motion.div
          style={{ x }}
          className="flex flex-row items-center justify-between gap-x-5 w-fit mx-0 px-0"
        >
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          works.map((item: any, i: number) => (
            <div
              key={i}
              className="w-64 h-80 overflow-hidden flex flex-row items-center justify-center mx-0 px-0"
            >
              <Link href={WORKS_PAGE + '/' + item.slug}>
                <motion.img
                  src={item.images[0].image.url}
                  className="h-96 object-center object-cover cursor-pointer mx-0 px-0 z-0"
                  style={{ width: '32rem' }}
                  whileHover={{ scale: 1.5 }}
                />
              </Link>
            </div>
          ))}
        </motion.div>
        <span className="absolute top-50% left-50% text-white font_light font-extralight text-4xl pointer-events-none">
          &#x2b;
        </span>
      </div>
    </div>
  )
}

export default WorksPageComponent
