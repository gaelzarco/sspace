import { type FC } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'

import Friends from '@/components/friends'
import ThemeSwitch from '@/components/themeswitch'

const DashSideBar: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const friends = await getFriendsByUserId(session.user.id)

  return (
    <div className='flex flex-col items-center h-full min-w-[320px] xl:min-w-[400px] border-r border-neutral-200 dark:border-neutral-800'>
      <div className='flex flex-row text-sm h-22 py-2 items-center justify-between w-full px-3 border-b border-neutral-200 dark:border-neutral-800'>
        <Link
          href='/'
          className='text-2xl font-bold justify-self-start dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 p-2 m-2'
        >
          <h1>Social Space</h1>
        </Link>
        <ThemeSwitch />
      </div>

      <div className='h-full w-full mx-4'>
        <Friends userId={session.user.id} initialFriends={friends} />
      </div>
    </div>
  )
}

export default DashSideBar
