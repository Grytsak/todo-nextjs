import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { ITask } from '../models/Task'

const TasksList = (props: {tasks: ITask[]}) => {
    const tasks = props.tasks.length > 0 ? props.tasks : null
    
    const renderTasks = () => {
        if(tasks) {
            return (
                tasks.map(task => {
                return <li key={task._id}><Task task={task} /></li>
                })
            )
        } else {
            return (<p>Loading...</p>)
        }
    }

    return(
        <>
            <h2>Tasks List</h2>
            <ul>{renderTasks()}</ul>
        </>
    )
}

export default TasksList