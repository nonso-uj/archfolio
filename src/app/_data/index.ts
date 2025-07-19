import { getPayload } from 'payload'
import config from '@/payload.config'

export const querySlug = async (slug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageBySlug = await payload.find({
    collection: 'homePage',
    pagination: false,
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      'tenant.name': {
        equals: slug,
      },
    },
  })

  return pageBySlug.docs[0]
}

export const queryAboutSlug = async (slug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageBySlug = await payload.find({
    collection: 'aboutPage',
    pagination: false,
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      'tenant.name': {
        equals: slug,
      },
    },
  })

  return pageBySlug.docs[0]
}

export const queryWorkSlug = async (slug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageBySlug = await payload.find({
    collection: 'work',
    pagination: false,
    depth: 2,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      images: true,
      slug: true,
    },
    where: {
      'tenant.name': {
        equals: slug,
      },
    },
  })


  return pageBySlug.docs
}

export const querySingleWorkSlug = async (slug: string, workslug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageBySlug = await payload.find({
    collection: 'work',
    pagination: false,
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      and: [
        {
          'tenant.name': {
            equals: slug,
          },
        },
        {
          slug: {
            equals: workslug,
          },
        },
      ],
    },
  })

  return pageBySlug.docs[0]
}

export const queryContactSlug = async (slug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageBySlug = await payload.find({
    collection: 'contactPage',
    pagination: false,
    depth: 2,
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      'tenant.name': {
        equals: slug,
      },
    },
  })

  return pageBySlug.docs[0]
}

export const queryUser = async (slug: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL
  if (!base) throw new Error('Base URL not configured')

  const res = await fetch(`${base}/api/users/fullName/${slug}`, {
    cache: 'force-cache',
    headers: {
      'content-type': 'application/json',
    },
  })

  const json = await res.json()

  if (!res.ok) throw new Error('User not found')
  return json.user.docs[0]
}
