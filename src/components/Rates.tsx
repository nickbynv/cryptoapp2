'use client'
import { ICurrency } from '@/entities/currencies'
import { useState } from 'react'
import SelectionConvertCurrencyMenu from './reusable/SelectionConvertCurrencyMenu'

export default function Rates(props: {
    currencies: ICurrency[]
}) {
    const convertCurrencies = [
        { symbol: 'USD', price: 1, icon: '$' },
        { symbol: props.currencies[0].symbol, price: props.currencies[0].values.USD.price, icon: 'Ƀ' },
        { symbol: props.currencies[1].symbol, price: props.currencies[1].values.USD.price, icon: 'Ξ' }
    ]

    const [currentCurrency, setCurrentCurrency] = useState(convertCurrencies[0])

    const [sortToggle, setSortToggle] = useState({
        current: false,
        field: ''
    })

    return (
        <main className='w-full h-[91%] overflow-hidden text-md lg:w-[80%] lg:h-[87%] lg:mt-10 lg:shadow-md lg:rounded-xl'>
            <div className='p-3'>
                <h1 className='mb-8 font-normal text-2xl'>Public watchlist</h1>

                <SelectionConvertCurrencyMenu
                    currencies={convertCurrencies}
                    currentCurrency={currentCurrency}
                    setCurrentCurrency={setCurrentCurrency}
                />
            </div>

            <div className='overflow-auto h-full'>
                <table className='w-full'>
                    <thead>
                        <tr className='text-left border-b border-b-dark-50'>
                            {['Name', 'Price USD', 'Circulating Supply', 'Market Cap', 'Category'].map(field => (
                                <th
                                    key={field}
                                    className='px-5 py-3 font-medium cursor-pointer transition-colors hover:bg-slate-100'
                                    onClick={() => {
                                        setSortToggle(prev => {
                                            if (field === sortToggle.field) {
                                                return {
                                                    ...prev,
                                                    current: !sortToggle.current
                                                }
                                            } else {
                                                return {
                                                    ...prev,
                                                    current: true,
                                                    field
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <abbr>{field}</abbr>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className='overflow-auto'>
                        {[...props.currencies].sort((a, b) => {
                            if (sortToggle.current) {
                                if (sortToggle.field === 'Name') {
                                    if (a.name < b.name) return -1
                                    if (a.name > b.name) return 1
                                }

                                if (sortToggle.field === 'Category') {
                                    if (a.category < b.category) return -1
                                    if (a.category > b.category) return 1
                                }

                                if (sortToggle.field === 'Price USD') {
                                    return b.values.USD.price - a.values.USD.price
                                }

                                if (sortToggle.field === 'Circulating Supply') {
                                    return b.circulatingSupply - a.circulatingSupply
                                }

                                if (sortToggle.field === 'Market Cap') {
                                    return a.values.USD.marketCap - b.values.USD.marketCap
                                }
                            }

                            return 0
                        }).map(currency => {
                            const { id, name, symbol, values, circulatingSupply, category } = currency

                            const formatNumber = (num: number): string => {
                                const units = ['', '', 'M', 'B', 'T']

                                for (let i = units.length - 1; i >= 0; i--) {
                                    const decimal = 1000 ** i

                                    if (num >= decimal) {
                                        return `${(num / decimal).toLocaleString(undefined, {
                                            minimumFractionDigits: i > 0 ? 3 : 0,
                                            maximumFractionDigits: i > 0 ? 3 : 0
                                        })}${units[i]}`
                                    }
                                }

                                return num.toLocaleString()
                            }

                            return <tr key={id} className='border-b border-b-dark-50 text-slate-700'>
                                <td className='px-5 py-3'>
                                    <span className='mr-2 font-medium'>{name}</span>
                                    <span className='text-blue-900'>{symbol}</span>
                                </td>

                                <td className='px-5 py-3 font-medium'>
                                    {currentCurrency.icon} {formatNumber(values.USD.price / currentCurrency.price)}
                                </td>

                                <td className='px-5 py-3'>
                                    <span className='mr-2 text-blue-900'>{symbol}</span>
                                    <span className='font-medium'>{formatNumber(circulatingSupply)}</span>
                                </td>

                                <td className='px-5 py-3 font-medium'>
                                    {currentCurrency.icon} {formatNumber(values.USD.marketCap / currentCurrency.price)}
                                </td>

                                <td className='px-5 py-3 text-blue-900'>
                                    {category}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}