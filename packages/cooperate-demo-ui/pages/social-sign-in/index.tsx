import { useEffect } from 'react'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

const SocialSignIn: NextPage = () => {
  const { data: session } = useSession()
  useEffect(() => {
    signIn('github')
  }, [])
  return (
    <div>
    </div>
  )
}

export default SocialSignIn
