'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../styles/globals.css'

export default (props: {
  children: React.ReactNode
}) => {
  const pages = ['/converter', '/rates']
  const pathname = usePathname()

  return (
    <html lang='en'>
      <head />
      <body>
        {props.children}

        <div className='fixed bottom-0 h-[9%] flex justify-center items-center'>
          {pages.map(page => (
            <Link
              key={page}
              href={page}
              className={`block w-5 h-5 mx-1 ${page === pathname
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
