import type { CollectionConfig } from 'payload'

export const User: CollectionConfig = {
  slug: 'user',
  auth: false,
  fields: [
    {
      name: 'user_id',
      type: 'text',
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      unique: true,
    },
  ],
}
