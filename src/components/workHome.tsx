'use client'

import { routesFunc } from '@/utilities/routes'
import { Link } from 'react-transition-progress/next'
import React, { useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WorkHome = ({ work, userSlug, i }: any) => {
  const ref = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cursorImage = (e: any) => {
    ref.current.style.left = e.pageX - ref.current.clientWidth / 2 + 'px'
    ref.current.style.top = e.pageY - ref.current.clientHeight / 2 + 'px'
    ref.current.style.pointerEvents = 'none'
  }

  const cursorImageShow = () => {
    ref.current.style.display = 'block'
  }
  const cursorImageHide = () => {
    ref.current.style.display = 'none'
  }

  const { WORKS_PAGE } = routesFunc(userSlug || '')

  return (
    <Link href={WORKS_PAGE + '/' + work.slug}>
      <div
        className={`border-b-2 ${i === 0 && 'border-t-2'} border-gray-200 h-fit w-full grid grid-cols-2 justify-between items-center px-2 lg:px-28 py-14 hover:px-16 cursor-pointer transition-all ease-in-out duration-300`}
        onMouseEnter={(e) => {
          setHovered(true)
          cursorImageShow()
        }}
        onMouseLeave={(e) => {
          setHovered(false)
          cursorImageHide()
        }}
        onMouseMove={(e) => cursorImage(e)}
      >
        <p
          className={`justify-self-start text-2xl lg:text-6xl max-w-md font-semibold transition-all ease-in-out duration-300 ${hovered && 'text-gray-300'} font_bold uppercase [break-anywhere] text-black`}
          style={{ overflowWrap: 'anywhere' }}
        >
          {work.title}
        </p>
        <p
          className={`justify-self-end text-lg font-regular transition-all ease-in-out duration-300 ${hovered && 'text-gray-300'} font_semibold text-black`}
        >
          {work.role}
        </p>

        <div ref={ref} className="absolute z-10 w-80 h-fit bg-black p-10 hidden">
          <div className="w-full h-full relative">
            <img
              src={work.images[0].image.url}
              alt="work image"
              className="w-full h-auto object-cover"
            />
            <div className="w-12 h-12 rounded-full bg-blue-700 absolute top-1/3 left-1/3 flex flex-row items-center justify-center p-10">
              <p className="font_semibold text-white">View</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
