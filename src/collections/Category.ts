
import type { CollectionConfig } from 'payload'


export const Category: CollectionConfig = {
  slug: 'categories',
  auth: false,
  fields: [
    // Email added by default
    {
      name: 'category_name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
  ],

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  // hooks: {
  //   beforeChange: [
  //     async ({ data, req }) => {
  //       const existingCategory = await req.payload.find({
  //         collection: 'categories',
  //         where: {
  //           category_name: data.name,
  //           email: data.email,
  //         },
  //       })

  //       if (!existingCategory) {
  //         const error = new Error('Category name must be unique for this user.') as Error & {
  //           statusCode: number
  //         }
  //         error.statusCode = 409
  //         throw error
  //       }
  //       return data
  //     },
  //   ],
  // },
}
