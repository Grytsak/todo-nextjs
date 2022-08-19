import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const Task = (props: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { _id, name, done } = props.task
    const [editedName, setEditedName] = useState(name)
    const [check, setCheck] = useState(done)
    const [timer, setTimer] = useState()


const onToggleStatus = () => {
    try {
        setCheck(!check)
        axios.patch(`http://localhost:3000/api/tasks/edit-status`, {_id, done: !check})
        router.replace(router.asPath)
    } catch (error) {
        console.log(error)
    }
}

const onEditTask = (e: any) => {
    e.preventDefault()
    let value = e.target.value
    setEditedName(value)
    clearTimeout(timer)

    const newTimer: any = setTimeout( () => {
        try {
            axios.patch(`http://localhost:3000/api/tasks/${_id}`, {name: value})
            router.replace(router.asPath)
        } catch (error) {
            console.log(error)
        }
    }, 500)
    
    setTimer(newTimer)
}

const onDeleteTask = (e: any) => {
    e.preventDefault()
    try {
        axios.delete(`http://localhost:3000/api/tasks/${_id}`)
        router.replace(router.asPath)
    } catch (error) {
        console.log(error)
    }
}

    return(
        <div>
            <h3>{name}</h3>
            <form>
                <div>
                    <label htmlFor="status">Status: {done.toString()}</label>
                    <input 
                        type="checkbox"
                        id="status"
                        checked={done}
                        onChange={onToggleStatus}
                    />
                </div>
                <div>
                    <label htmlFor='editName'>Edit Task Name</label>
                    <input 
                        type='text'
                        id='editName'
                        name='editName'
                        value={editedName}
                        placeholder='Edit task name'
                        onChange={onEditTask}
                    />
                </div>
                <div><button onClick={onDeleteTask}>Delete</button></div>
            </form>
        </div>
    )
}

export default Task