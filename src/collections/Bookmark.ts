import type { CollectionConfig } from 'payload'

export const Bookmark: CollectionConfig = {
  slug: 'bookmarks',
  auth: false,
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'category_id',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
}
