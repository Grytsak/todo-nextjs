import React, { useState } from 'react'
import { useSession, signIn } from "next-auth/react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Register = () => {
  const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
      })

    const  { name, email, password, password2 } = formData

    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e: any) => {
        e.preventDefault()
    
        if (password !== password2) {
          throw new Error('Passwords do not match')
      } else {
          const userData = {
              name,
              email,
              password
          }

          axios.post('http://localhost:3000/api/register', userData)
          .then(async () => {
            await loginUser()
          }) 
      }
    }

      const loginUser = async () => {
        const res: any = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
          callbackUrl: `${window.location.origin}`,
        })
        
        res.error ? console.log(res.error) : router.push('/')
      }



    return(
        <section>
          <div>
              <h1>Register</h1>
              <p>Register new user</p>

              <form onSubmit={onSubmit}>
                <div>
                    <input 
                        type='name'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                  </div>
                  <div>
                      <input 
                          type='email'
                          id='email'
                          name='email'
                          value={email}
                          placeholder='Enter your email'
                          onChange={onChange}
                      />
                  </div>
                  <div>
                      <input 
                          type='password'
                          id='password'
                          name='password'
                          value={password}
                          placeholder='Enter your password'
                          onChange={onChange}
                      />
                  </div>
                  <div>
                      <input 
                          type='password'
                          id='password2'
                          name='password2'
                          value={password2}
                          placeholder='Confirm your password'
                          onChange={onChange}
                      />
                  </div>
                  <div>
                      <button type='submit'>
                          Submit
                      </button>
                      
                      <Link href='/login'>
                          Login
                      </Link>
                  </div>
              </form>
            </div>
        </section>
    )
}

export default Register