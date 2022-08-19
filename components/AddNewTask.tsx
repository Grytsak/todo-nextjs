import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'


const AddNewTask = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [formData, setFormData] = useState({name: ''})
    const { name } = formData

    const onChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const  onSubmit = (e: any) => {
        e.preventDefault()
        try {
            if(session) {
                axios.post('http://localhost:3000/api/tasks', { user: session.user._id, name })
                router.replace(router.asPath)
            }   
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Please add new task name"
                    value={name}
                    onChange={onChange}
                />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default AddNewTask