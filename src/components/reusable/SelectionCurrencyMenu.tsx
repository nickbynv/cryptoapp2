'use client'
import { ICurrency } from '@/entities/currencies'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function SelectionCurrencyMenu(props: {
    className?: string
    currencies: ICurrency[]
    currentCurrency: ICurrency
    setCurrentCurrency: React.Dispatch<React.SetStateAction<ICurrency>>
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

    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearch(`${props.currentCurrency.name} (${props.currentCurrency.symbol})`)
    }, [props.currentCurrency])

    return (
        <div ref={menuRef} className={`w-64 h-9 relative flex ${props.className}`}>
            <input
                className='w-full h-full rounded-xl px-3 pb-1 bg-slate-200 font-medium text-slate-700 hover:ring-2 hover:ring-slate-300 placeholder:text-sm'
                placeholder='Type currency for search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                    setOpen(true)
                    setSearch('')
                }}
            />

            <span className={`${open && 'rotate-180'} transition-all absolute right-3 top-[50%] translate-y-[-50%] font-semibold`}>
                <IoIosArrowDown />
            </span>

            <div className={`${open
                ? 'visible opacity-100'
                : 'invisible opacity-0'
                } w-full absolute top-[110%] rounded-xl p-2 shadow-lg transition-all bg-white`}>
                <ul className='max-h-72 overflow-auto'>
                    {props.currencies.filter(currency => {
                        const t = (value: string) => value.toLowerCase().includes(search.toLowerCase())
                        return t(`${currency.name} ${currency.symbol}`) || !search.length
                    }).map(currency => (
                        <li
                            key={currency.id}
                            className='text-slate-700 font-medium p-2 rounded-xl transition-colors cursor-pointer hover:bg-slate-200'
                            onClick={() => {
                                props.setCurrentCurrency(currency)
                                setOpen(false)
                            }}
                        >
                            {currency.name} ({currency.symbol})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}