import type { FieldHook, Where } from 'payload'

import { ValidationError } from 'payload'

export const ensureUniqueUsername: FieldHook = async ({
  originalDoc,
  req,
  value,
  operation,
}) => {
  // if value is unchanged, skip validation
  if (originalDoc.username === value) {
    return value
  }

  const constraints: Where[] = [
    {
      username: {
        equals: value,
      },
    },
  ]

  const findDuplicateUsers = await req.payload.find({
    collection: 'users',
    where: {
      and: constraints,
    },
  })

  if (findDuplicateUsers.docs.length > 0) {
    throw new ValidationError({
      errors: [
        {
          message: `A user with the username ${value} already exists`,
          path: 'username',
        },
      ],
    })
  }

  if (operation === 'update') {
    const tenantRelation = originalDoc.tenants?.[0]
    console.log('tenantRelation===', tenantRelation)
    if (tenantRelation) {
      try {
        const updateTenantAttempt = await req.payload.update({
          collection: 'slug',
          where: {
            id: {
              equals: tenantRelation.tenant,
            },
          },
          data: { name: value },
          req,
        })

        console.log('tenant updated===', updateTenantAttempt)
      } catch (error) {
        throw new ValidationError({
          errors: [
            {
              message: `Something went wrong during update, check your input and try again  ${error}`,
              path: 'username',
            },
          ],
        })
      }
    }
  }

  return value
}
