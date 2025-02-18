import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const api_ = process.env.API_URL

    const id = (await params).id
    const result = await payload.find({
      collection: 'bookmarks',
      depth: 10,
      where: {
        category_id: {
          equals: id,
        },
      },
    })
    // console.log(result)
    console.log('GET request to /api/category/id')
    const response = NextResponse.json(result.docs, { status: 200 })
    response.headers.set('Access-Control-Allow-Origin', api_)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 500 })
  }
}
export async function POST(req: NextRequest) {
  try {
    const api_ = process.env.API_URL

    const body = await req.json()
    const { name, category_id, url_ } = body
    console.log(name, category_id, url_)
    await payload.create({
      collection: 'bookmarks',
      data: {
        title: name,
        url: url_,
        category_id: category_id,
      },
    })
    console.log('POST request to /api/category/id')
    const response = NextResponse.json({ message: 'Hello inside category route' }, { status: 200 })
    response.headers.set('Access-Control-Allow-Origin', api_)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const api_ = process.env.API_URL

    const body = await req.json()
    const { id, category_id } = body
    console.log(category_id, id)

    await payload.delete({
      collection: 'bookmarks',
      id: id,
      where: {
        category_id: {
          equals: category_id,
        },
      },
    })
    console.log('DELETE request to /api/category/id')
    const response = NextResponse.json(
      { message: 'Hello inside bookmark delete route' },
      { status: 200 },
    )

    response.headers.set('Access-Control-Allow-Origin', api_)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const api_ = process.env.API_URL

    const body = await req.json()
    const { url_, id } = body
    await payload.update({
      collection: 'bookmarks',
      id: id,
      data: {
        url: url_,
      },
    })
    const response = NextResponse.json(
      { message: 'Inside the bookmark PATCH route' },
      { status: 200 },
    )

    response.headers.set('Access-Control-Allow-Origin', api_)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 500 })
  }
}
