import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const blogId = req.query.id as string

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        views: {
          increment: 1
        }
      }
    })

    return res.status(200).json(updatedBlog)
  } catch (error) {
    console.error('Error updating views:', error)
    return res.status(500).json({ message: 'Error updating views' })
  }
}