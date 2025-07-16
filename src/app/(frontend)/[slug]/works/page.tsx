import { NavBar } from '@/components/Nav'
import { queryWorkSlug } from '@/app/_data'
import '../../globals.css'
import { PICTURES_PLACEHOLDER } from '@/utilities/constants'
import WorksPageComponent from '@/components/worksPageComponent'
import { notFound } from 'next/navigation'
import { getUser } from '../page'
import { Metadata } from 'next'

export default async function WorksPageView({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>
}) {
  const params = await paramsPromise

  const slug = params?.slug

  // console.log('sluggg===', slug, params)
  
  const pageBySlug = await queryWorkSlug(slug || '')
  
  // console.log('pageBySlug===', pageBySlug)

  if (!pageBySlug) {
    notFound()
  }

  const images = pageBySlug || PICTURES_PLACEHOLDER

  return (
    <div className={`bg-black`}>
      <NavBar userSlug={slug || ''} extraClasses={'px-10 text-white w-full'} />

      <WorksPageComponent slug={slug || ''} works={images} />
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
  console.log('metadata1===', slug)
  const user = await getUser(slug)
  const fullName = user.fullName ? user.fullName + ' || ' : ''

  console.log('metadata===', slug, user )
  
  const pageTitle = 'Works || ' + fullName + 'Archifolio'
  const pageDescription = user.fullName
      ? 'Explore the projects of' + fullName + 'on Archfolio'
      : 'Explore projects on Archfolio'
  return {
    description: pageDescription,
    title: pageTitle,
  }
}