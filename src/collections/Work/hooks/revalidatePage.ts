import type { Work } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePage: CollectionAfterChangeHook<Work> = async ({
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
      const path = tenantDoc.name ? `/${tenantDoc.name}/works` : ''
      const singlePath = tenantDoc.name ? `/${tenantDoc.name}/${doc.slug}` : ''
      console.log('path===', path)
      console.log('path===', singlePath)

      payload.logger.info(`Revalidating page at path: ${path}`)
      payload.logger.info(`Revalidating page at path: ${singlePath}`)

      revalidatePath(path)
      revalidatePath(singlePath)
      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      // @ts-ignore
      const oldPath = tenantDoc.name ? `/${tenantDoc.name}/works` : ''
      const singleOldPath = tenantDoc.name ? `/${tenantDoc.name}/${previousDoc.slug}` : ''

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)
      payload.logger.info(`Revalidating old page at path: ${singleOldPath}`)

      revalidatePath(oldPath)
      revalidatePath(singleOldPath)
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Work> = async ({
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
    const path = tenantDoc.name ? `/${tenantDoc.name}/works` : ''
    const singlePath = tenantDoc.name ? `/${tenantDoc.name}/${doc.slug}` : ''

    revalidatePath(path)
    revalidatePath(singlePath)
    revalidateTag('pages-sitemap')
  }

  return doc
}
