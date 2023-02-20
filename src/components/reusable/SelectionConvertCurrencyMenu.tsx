'use client'
import { IConvertCurrency } from '@/entities/currencies'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function SelectionConvertCurrencyMenu(props: {
    className?: string
    currencies: IConvertCurrency[]
    currentCurrency: IConvertCurrency
    setCurrentCurrency: React.Dispatch<React.SetStateAction<IConvertCurrency>>
}) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    return (
        <div ref={menuRef} className={`w-24 h-9 relative flex mb-7 ${props.className}`}>
            <button className='w-full h-full text-left px-3 rounded-xl bg-slate-200 font-medium text-slate-700 hover:ring-2 hover:ring-slate-300' onClick={() => setOpen(prev => !prev)}>
                {props.currentCurrency.symbol}
            </button>

            <span className={`${open && 'rotate-180'} transition-all absolute right-2 top-[50%] translate-y-[-50%] font-semibold`}>
                <IoIosArrowDown />
            </span>

            <div className={`${open
                ? 'visible opacity-100'
                : 'invisible opacity-0'
                } w-full absolute top-[110%] rounded-xl p-1 shadow-lg transition-all bg-white`}>
                <ul className='max-h-72 overflow-auto'>
                    {props.currencies.map(currency => (
                        <li
                            key={currency.symbol}
                            className='text-slate-700 font-medium p-2 rounded-xl transition-colors cursor-pointer hover:bg-slate-200'
                            onClick={() => {
                                props.setCurrentCurrency(currency)
                                setOpen(false)
                            }}
                        >
                            {currency.symbol}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}