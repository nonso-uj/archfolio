'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { toTitleCaseArray } from '@/utilities/helpers'
import RichText from './RichText'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleWork = ({ work }: { work: any }) => {
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ['50%', '-50%'])

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-between w-full h-auto px-5 lg:px-52 pt-5 pb-20">
        <div className="w-full h-fit py-10 text-start">
          <h1 className="font_semibold uppercase text-6xl lg:text-8xl leading-tight">
            {work.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 items-start justify-between py-10">
          <div className="w-full flex flex-col items-start justify-between gap-y-4 max-w-72">
            <p className="font_light font-semibold text-xs text-neutral-400">ROLE</p>
            <hr className="w-full bg-neutral-300" />
            <p className="font_regular text-base font-medium">{work.role}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-between gap-y-4 max-w-72">
            <p className="font_light font-semibold text-xs text-neutral-400">SOFTWARE USED</p>
            <hr className="w-full bg-neutral-300" />
            <p className="font_regular text-base font-medium">
              {toTitleCaseArray(work.softwareUsed)}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-between gap-y-4">
          <p className="font_light font-semibold text-xs text-neutral-400">SUMMARY</p>
          <hr className="w-full bg-neutral-300" />

          <RichText className="font_regular" data={work.details} enableGutter={false} />
        </div>
      </div>

      <div
        ref={targetRef}
        style={{ height: '1000vh' }}
        className="hidden lg:block relative w-full bg-black"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
          <motion.div
            style={{ x }}
            className="flex flex-row items-center justify-between gap-x-10 h-full w-fit mx-0 px-0"
          >
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              work.images.map((item: any, i: any) => (
                <div
                  key={i}
                  className="w-full lg:w-[50rem] h-3/4 overflow-hidden flex flex-row items-center justify-center mx-0 px-0"
                >
                  <motion.img
                    src={item.image.url}
                    className="w-full h-full object-cover object-center max-h-[40rem]"
                  />
                </div>
              ))
            }
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden flex flex-col items-center justify-evenly gap-y-2 w-full h-fit px-0 lg:px-40 py-10 lg:py-36">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          work.images.map((item: any, i: any) => (
            <img
              key={i}
              className="w-full object-cover object-center h-full max-h-[40rem]"
              src={item.image.url}
              alt=""
            />
          ))
        }
      </div>
    </div>
  )
}

export default SingleWork
