import React, { useState } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Login = ({ providers }: any) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })

    const  { email, password } = formData

    const onChange = (e: any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = async (e: any) => {
        e.preventDefault()
        
        const res: any = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}`,
          })
          
          res.error ? console.log(res.error) : router.push('/')
      }

    return(
        <section>
          <div>
              <h1>Login</h1>
              <p>Login and start adding task</p>

              <form onSubmit={onSubmit}>
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
                      <button type='submit'>
                          Submit
                      </button>
                      
                      <Link href='/register'>
                          Register
                      </Link>
                  </div>
              </form>
            </div>
        </section>
    )
}

export default Login

export async function getServerSideProps() {
    return {
      props: {
        providers: await getProviders(),
      },
    };
  }