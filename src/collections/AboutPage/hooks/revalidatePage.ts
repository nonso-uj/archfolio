import type { AboutPage } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePage: CollectionAfterChangeHook<AboutPage> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const tenantDoc = await payload.findByID({
      collection: 'slug',
      // @ts-ignore
      id: doc.tenant,
      depth: 1,
    })

    if (doc._status === 'published') {
      // @ts-ignore
      const path = tenantDoc.name ? `/${tenantDoc.name}/about` : ''
      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      // @ts-ignore
      const oldPath = tenantDoc.name ? `/${tenantDoc.name}/about` : ''

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<AboutPage> = async ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    const tenantDoc = await payload.findByID({
        collection: 'slug',
        // @ts-ignore
        id: doc.tenant,
        depth: 1,
      })

    // @ts-ignore
    const path = tenantDoc.name ? `/${tenantDoc.name}/about` : ''
    revalidatePath(path)
    revalidateTag('pages-sitemap')
  }

  return doc
}
