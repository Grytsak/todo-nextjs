import type { NextApiRequest, NextApiResponse } from 'next'
import Task from '../../../models/Task'
import dbConnect from '../../../lib/dbConnect'
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_JWT_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  dbConnect()

  if(method === 'GET') {
    try {
      const tasks = await Task.find({user: req.body._id})
      const token = await getToken({ req, secret })
      console.log("JSON Web Token", token)
      res.status(200).json(tasks)
    } catch (error: any) {
      res.status(500).json(error)
    }
  }
  if(method === 'POST') {
    try {
      const task = await Task.create(req.body)
      res.status(201).json(task)
    } catch (error: any) {
      res.status(500).json(error)
    }
  }
}
