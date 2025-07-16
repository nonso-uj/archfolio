import { NavBar } from '@/components/Nav'
import { querySingleWorkSlug } from '@/app/_data'
import '../../../globals.css'
import { PICTURES_PLACEHOLDER } from '@/utilities/constants'
import SingleWork from '@/components/SingleWork'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getUser } from '../../page'
import { cache } from 'react'

const getSingleWorkSlug = cache(
  async ({ slug = '', workslug = '' }: { slug?: string; workslug?: string }) =>
    querySingleWorkSlug(slug, workslug),
)

export default async function WorkPageView({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string; workslug?: string }>
}) {
  const params = await paramsPromise
  const { slug, workslug } = params

  const pageBySlug = await getSingleWorkSlug({ slug, workslug })

  if (!pageBySlug) {
    notFound()
  }

  const images = pageBySlug || PICTURES_PLACEHOLDER

  return (
    <div className="relative bg-neutral-200">
      <NavBar
        userSlug={slug || ''}
        extraClasses={'shrink-0 px-5 lg:px-14 text-black text-base lg:text-3xl'}
      />

      <SingleWork work={images} />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: any
    workslug: any
  }>
}): Promise<Metadata> {
  const { slug, workslug } = await params
  console.log('metadata1===', slug, workslug)
  const user = await getUser(slug)
  const getPageName = await getSingleWorkSlug({ slug, workslug })
  const pageName = getPageName?.title ? getPageName.title + ' || ' : ''
  const fullName = user.fullName ? user.fullName + ' || ' : ''

  console.log('metadata===', slug, user)

  const pageTitle = pageName + fullName + 'Archifolio'
  const pageDescription = user.fullName
    ? 'Explore the projects of' + fullName + 'on Archfolio'
    : 'Explore projects on Archfolio'
  return {
    description: pageDescription,
    title: pageTitle,
  }
}
