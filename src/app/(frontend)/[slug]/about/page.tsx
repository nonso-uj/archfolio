import React, { cache } from 'react'

import { NavBar } from '@/components/Nav'
import { queryAboutSlug } from '@/app/_data'
import '../../globals.css'
import {
  ABOUT_PLACEHOLDER,
  CONTACT_DUMMY,
  EXPERIENCE_DUMMY,
  SERVICES_DUMMY,
} from '@/utilities/constants'
import { formatDateToMonthYear } from '@/utilities/helpers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getUser } from '../page'

export default async function AboutPageView({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>
}) {
  const params = await paramsPromise
  const slug = params?.slug
  const pageBySlug = await queryAboutSlug(slug || '')

  if (!pageBySlug) {
    notFound()
  }

  const user = await getUser(slug || '')
  const fullName = user.fullName ? user.fullName : 'Full Name'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    aboutImage,
    aboutText = ABOUT_PLACEHOLDER,
    workingExperience = EXPERIENCE_DUMMY,
    services = SERVICES_DUMMY,
    contact = CONTACT_DUMMY,
  }: any = pageBySlug

  return (
    <div className="flex flex-col justify-start items-center relative bg-neutral-200 h-auto lg:h-screen w-screen">
      <NavBar
        fullName={fullName}
        userSlug={slug || ''}
        extraClasses={'px-5 lg:px-14 text-neutral-400 text-base w-full bg-[#111111]'}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-x-[1px] flex-grow h-full w-full py-[1px]">
        <div className="flex flex-col items-stretch justify-between h-full text-neutral-400 gap-y-[1px]">
          <div className="bg-[#111111] h-full flex flex-cols items-center justify-center py-10 lg:py-0">
            <p className="font_regular text-lg text-center text-neutral-400 w-3/4">{aboutText}</p>
          </div>

          <div className="bg-[#111111] h-auto w-full px-5 flex flex-col items-center justify-center gap-y-8 py-10 lg:py-4">
            <h3 className="text-end font_light text-2xl w-full lg:w-4/5 mx-auto border-solid border-b border-neutral-600 text-nowrap mt-4">
              Working Experience
            </h3>

            <div className="grid grid-cols-2 grid-flow-rows items-end justify-center gap-y-2 gap-x-5 w-full lg:w-5/6 mx-auto">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {workingExperience.map((work: any, i: number) => (
                <div key={i}>
                  <h5 className="text-end font_light text-base mb-3 border-solid border-b border-neutral-600">
                    {work.role}
                  </h5>
                  <p className="font_regular text-sm text-neutral-400">
                    {formatDateToMonthYear(new Date(work.startDate))} -{' '}
                    {formatDateToMonthYear(new Date(work.endDate))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-full bg-[#111111] p-2">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: 'url(' + aboutImage?.url || '/img/portrait.jpg' + ')' }}
          >
            <img src="/img/noisy.png" alt="" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-between h-full text-neutral-400 gap-y-[1px]">
          <div className="bg-[#111111] h-full w-full px-5 flex flex-col items-center justify-center gap-y-8 py-10 lg:py-0">
            <h3 className="text-end font_light text-2xl w-full lg:w-4/5 mx-auto border-solid border-b border-neutral-600 text-nowrap">
              I can help you with
            </h3>

            <div className="grid grid-cols-2 grid-flow-rows items-end justify-center gap-y-5 gap-x-5 w-full lg:w-5/6 mx-auto">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {services.map((item: any, i: number) => (
                <h5
                  key={i}
                  className="w-full text-end font_light text-lg border-solid border-b border-neutral-600 hover:text-white hover:text-2xl hover:cursor-pointer transition-all duration-300"
                >
                  {item?.service}
                </h5>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] h-auto w-full px-5 flex flex-col items-center justify-center gap-y-8 py-10 lg:py-4">
            <h3 className="font_light text-2xl w-full lg:w-4/5 mx-auto text-end border-solid border-b border-neutral-600 text-nowrap">
              Get in touch
            </h3>

            <div className="grid grid-cols-3 items-center justify-center gap-x-2 w-full lg:w-5/6 mx-auto text-nowrap">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {contact.map((item: any, i: number) => (
                <a key={i} href={item.link} target="_blank">
                  <p className="font_regular text-base text-neutral-400 hover:text-white hover:text-2xl transition-all duration-300">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: any
  }>
}): Promise<Metadata> {
  const { slug } = await params
  const user = await getUser(slug)
  const fullName = user.fullName ? user.fullName + ' || ' : ''

  const pageTitle = 'About || ' + fullName + 'Archifolio'
  const pageDescription = user.fullName
    ? 'Explore the projects of' + fullName + 'on Archfolio'
    : 'Explore projects on Archfolio'

  return {
    description: pageDescription,
    title: pageTitle,
  }
}
