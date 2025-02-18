import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
export async function POST(req: NextRequest) {
  try {
    const api_ = process.env.API_URL || ''
    const body = await req.json()
    const { user_id, req_type, name } = body
    // console.log(user_id, req_type)
    // console.log(user_id)
    if (req_type === 'get') {
      const result = await payload.find({
        collection: 'categories',
        depth: 2,
        where: {
          email: {
            equals: user_id,
          },
        },
      })
      //   console.log('GET request to /api/category')
      const response = NextResponse.json(result, { status: 200 })
      response.headers.set('Access-Control-Allow-Origin', api_) // Replace with your frontend domain
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Include necessary headers
      return response
    }
    if (req_type === 'create') {
      console.log(req_type, 'in here')
      const check = await checkUnique(name)
      if (check === false) {
        return NextResponse.json({ status: 409 })
      }
      if (check === true) {
        await payload.create({
          collection: 'categories',
          data: {
            category_name: name,
            email: user_id,
          },
          overrideAccess: true,
        })
        const response = NextResponse.json({ status: 200 })
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000') // Replace with your frontend domain
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Include necessary headers
        return response
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 501 })
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const api_ = process.env.API_URL || ''
    const body = await req.json()
    const { user_id, id } = body
    console.log(user_id, id)

    // try {
    //
    // } catch (error) {
    //   return NextResponse.json({ status: 400 })
    // }
    const verify_ = await find_collection(id, user_id)
    console.log(verify_)
    if (verify_?.status === 400) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    }
    await payload.delete({
      collection: 'bookmarks',
      where: {
        category_id: {
          equals: id,
        },
      },
    })
    await payload.delete({
      collection: 'categories',
      id: id,
    })
    console.log('DELETE request to /api/category')
    const response = NextResponse.json(
      { message: 'Hello inside category delete route' },
      { status: 200 },
    )

    response.headers.set('Access-Control-Allow-Origin', api_) // Replace with your frontend domain
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Include necessary headers

    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ status: 500 })
  }
}

async function find_collection(id: string, user_id: string) {
  try {
    const res = await payload.findByID({
      collection: 'categories',
      depth: 1,
      id: id,
    })
    console.log(res)
    if (res.email === user_id) {
      return { status: 200 }
    }
    return { status: 400 }
  } catch (error) {
    return { status: 400 }
  }
}

async function checkUnique(name: string) {
  try {
    const res = await payload.find({
      collection: 'categories',
      depth: 2,
      where: {
        category_name: {
          equals: name,
        },
      },
    })
    console.log(res)
    if (res.docs.length > 0) {
      return false
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
