import React, { cache } from 'react'
import { Link } from 'react-transition-progress/next'

import { NavBar } from '@/components/Nav'
import { VelocityText } from '@/components/scroll'
import { MagneticFramer } from '@/components/framer'
import { routesFunc } from '@/utilities/routes'
import { VelocityImages } from '@/components/carousel'
import { WorkHome } from '@/components/workHome'
import { ScrollImages } from '@/components/scrollImages'
import Button from '@/components/Button'
import { querySlug, queryUser } from '@/app/_data'
import '../globals.css'
import {
  ABOUT_PLACEHOLDER,
  PICTURES_PLACEHOLDER,
  SKILLS_PLACEHOLDER,
  TOPWORKS_PLACEHOLDER,
} from '@/utilities/constants'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export default async function HomePageView({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>
}) {
  const params = await paramsPromise
  const slug = params?.slug

  const pageBySlug = await querySlug(slug || '')

  if (!pageBySlug) {
    notFound()
  }

  const { ABOUT_PAGE, WORKS_PAGE } = routesFunc(slug || '')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    heroImage,
    heroText = 'Name Here',
    aboutText = ABOUT_PLACEHOLDER,
    skills = SKILLS_PLACEHOLDER,
    topWorks = TOPWORKS_PLACEHOLDER,
    images = PICTURES_PLACEHOLDER,
  }: any = pageBySlug

  return (
    <div className='bg-white'>
      {/* HERO SECTION */}
      <div
        className="relative homeImage h-screen w-full m-0 flex flex-col justify-between items-stretch"
        style={{
          backgroundImage: `url(${heroImage?.url || '/img/blur.png'})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transition: 'background 0.5s ease',
        }}
      >
        <NavBar
          userSlug={slug || ''}
          extraClasses={'shrink-0 text-base lg:text-3xl px-5 lg:px-14 text-white'}
        />

        <div className="text-white mb-5">
          <VelocityText name={heroText || ''} />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="mx-auto w-full h-fit my-10 overflow-x-clip">
        <div className="w-full p-0 m-0 flex flex-col items-center justify-between gap-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between py-0 my-0 w-fit mx-3 lg:mx-20">
            <div className="w-full lg:w-8/12">
              <p className="text-xl lg:text-2xl font-normal tracking-wide leading-relaxed mx-1 lg:mx-5 my-5 font_regular text-black">
                {aboutText}
              </p>
            </div>

            <div className="w-full lg:w-4/12 flex flex-row items-center justify-center">
              <MagneticFramer>
                <Link href={ABOUT_PAGE}>
                  <Button
                    className="bg-black text-white rounded-full w-36 h-36 font_semibold"
                    whileHover={{
                      scale: 1.5,
                      backgroundColor: '#455CE9',
                      transition: { type: 'spring', bounce: 0.5 },
                    }}
                    content={'About me'}
                  />
                </Link>
              </MagneticFramer>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-y-3 overflow-x-hidden w-full">
            <p className="font_light font-semibold text-xs text-neutral-400 w-full text-center">
              SKILLS
            </p>
            <hr className="w-[80vw] bg-neutral-300 mx-auto" />
            <VelocityImages images={skills || SKILLS_PLACEHOLDER} />
          </div>
        </div>
      </div>

      {/* WORKS SECTION */}
      <div className="h-fit w-full px-1 lg:px-20">
        <h4 className="text-center text-xs text-neutral-400 font-semibold font_semibold my-3 w-full">
          WORKS
        </h4>
        {/* <p className='font_light font-semibold text-xs text--400 text-start mx-36'></p> */}
        <div className="mx-1 lg:mx-20">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {topWorks?.map((work: any, i: number) => (
            <WorkHome key={i} work={work?.topWork || work} i={i} />
          ))}
        </div>
        <div className="w-full flex flex-row items-center justify-center my-14">
          <MagneticFramer>
            <Link href={WORKS_PAGE}>
              <Button
                className="bg-black text-white rounded-full px-10 py-5 w-fit h-fit font_regular font-semibold text-2xl"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: '#455CE9',
                  transition: { type: 'spring', bounce: 0.5 },
                }}
                content={'More work'}
              />
            </Link>
          </MagneticFramer>
        </div>
      </div>

      {/* PARALLAX SECTION */}
      <ScrollImages footerImages={images} />
    </div>
  )
}

export const getUser = cache(async (slug: string) => queryUser(slug))

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: any
  }>
}): Promise<Metadata> {
  const { slug } = await params
  console.log('metadata1===', slug)
  const user = await getUser(slug)
  const fullName = user.fullName ? user.fullName + ' || ' : ''

  //   const user.fullName = ''

  console.log('metadata===', slug, user)

  const pageTitle = fullName + 'Archifolio'
  const pageDescription = user.fullName
    ? 'Explore the projects of' + fullName + 'on Archfolio'
    : 'Explore projects on Archfolio'

  console.log('pageTitle===', pageTitle)
  return {
    description: pageDescription,
    title: pageTitle,
  }
}
