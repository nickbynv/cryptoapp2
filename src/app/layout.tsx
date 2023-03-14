'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

export default (props: {
  children: React.ReactNode
}) => {
  const pages = ['converter', 'rates']
  const [currentPage, setCurrentPage] = useState(pages[0])
  const router = useRouter()

  useEffect(() => {
    router.push('/' + currentPage)
  }, [])

  return (
    <html lang='en'>
      <head />
      <body>
        {props.children}

        <div className='fixed bottom-0 h-[9%] flex justify-center items-center'>
          {pages.map(page => (
            <Link
              key={page}
              href={'/' + page}
              onClick={() => setCurrentPage(page)}
              className={`block w-5 h-5 mx-1 ${page === currentPage
                ? 'bg-blue-600'
                : 'bg-blue-200 hover:bg-blue-300'
                } rounded-full transition-colors`}
            />
          ))}
        </div>
      </body>
    </html>
  )
}
