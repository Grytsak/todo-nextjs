import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../lib/dbConnect'
import Task from '../../../../models/Task'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { 
        method,
        query: { id }
    } = req
    
    dbConnect()

    if(method === 'PATCH') {
        try {
          const task = await Task.findByIdAndUpdate(req.body._id, req.body, {new: true})
          res.status(200).json(task)
        } catch (error) {
          res.status(500).json(error)
        }
      }
  }