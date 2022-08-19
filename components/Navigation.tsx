import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'


const Navigation = () => {
    const { data: session } = useSession()

    const logOut = () => {
        signOut({
            callbackUrl: '/login'
          })
    }

    return (
        <div>
            <ul>
                <li><b>User: {session?.user?.name}</b></li>
                <li><Link href='/register'>Register</Link></li>
                <li><Link href='/login'>Login</Link></li>
                <li><span onClick={logOut}>Logout</span></li>
            </ul>
        </div>
    )
}

export default Navigation