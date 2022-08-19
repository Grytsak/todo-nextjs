import mongoose from 'mongoose'
import { Types } from 'mongoose'

export interface ITask {
    user: Types.ObjectId
    _id?: string
    name: string
    done: boolean
}

const taskSchema = new mongoose.Schema<ITask>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema)