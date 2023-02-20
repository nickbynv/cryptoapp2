'use client'
import { ICurrency } from '@/entities/currencies'
import { useEffect, useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import SelectionCurrencyMenu from './reusable/SelectionCurrencyMenu'

export default function Converter(props: {
    currencies: ICurrency[]
}) {
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        if (amount <= 0) {
            setAmount(1)
        }
    }, [amount])

    const [firstCurrency, setFirstCurrency] = useState(props.currencies[0])
    const [secondCurrency, setSecondCurrency] = useState(
        props.currencies.find(currency => currency.symbol === 'USDT')
        || props.currencies[1]
    )

    return (
        <main className='w-full h-full flex justify-center items-center'>
            <div className='text-md p-10 rounded-xl md:shadow-md'>
                <h1 className='mb-8 font-normal text-2xl'>Cryptocurrency Converter Calculator</h1>

                <div className='flex items-center mb-3'>
                    <input
                        className='w-56 h-10 ring-1 ring-blue-600 rounded-xl mr-3 px-2 hover:ring-2'
                        type='number'
                        min='1'
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <span className='font-medium'>Amount</span>
                </div>

                <div className='relative flex flex-col mb-5 md:flex-row'>
                    <SelectionCurrencyMenu
                        className='z-10 mb-2 md:mb-0 md:mr-2'
                        currencies={props.currencies}
                        currentCurrency={firstCurrency}
                        setCurrentCurrency={setFirstCurrency}
                    />

                    <button
                        className='w-9 h-9 mb-2 border text-blue-600 border-blue-600 rounded-xl bg-white flex justify-center items-center transition-colors hover:bg-blue-600 hover:text-white md:mb-0 md:mr-2'
                        onClick={() => {
                            const temp = firstCurrency
                            setFirstCurrency(secondCurrency)
                            setSecondCurrency(temp)
                        }}
                    >
                        <FaExchangeAlt size={13} />
                    </button>

                    <SelectionCurrencyMenu
                        className='z-9'
                        currencies={props.currencies}
                        currentCurrency={secondCurrency}
                        setCurrentCurrency={setSecondCurrency}
                    />
                </div>

                <span className='font-medium text-xl'>
                    {amount} {firstCurrency.symbol} = {(firstCurrency.values.USD.price / secondCurrency.values.USD.price * amount).toFixed(3)} {secondCurrency.symbol}
                </span>
            </div>
        </main>
    )
}