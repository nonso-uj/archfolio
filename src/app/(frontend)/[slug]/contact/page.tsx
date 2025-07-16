import React from 'react'

import { NavBar } from '@/components/Nav'
import { queryContactSlug } from '@/app/_data'
import '../../globals.css'
import Contact from '@/components/Contact'
import { notFound } from 'next/navigation'

export default async function AboutPageView({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>
}) {
  const params = await paramsPromise

  const slug = params?.slug

  // console.log('sluggg===', slug, params)

  const pageBySlug = await queryContactSlug(slug || '')

  if (!pageBySlug) {
    notFound()
  }

  // console.log('pageBySlug===', pageBySlug)

  return (
    <div className="relative bg-[#111111] w-full h-fit lg:h-screen flex flex-col items-start justify-center">
      <NavBar
        userSlug={slug || ''}
        extraClasses={'w-full px-5 lg:px-14 z-50 text-white shrink-0 text-base lg:text-3xl'}
      />

      <Contact details={pageBySlug} slug={slug || ''} />
    </div>
  )
}
