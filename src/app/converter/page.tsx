import Converter from '@/components/Converter'
import { fetchCurrencies } from '@/services/currencies'

export default async function ConverterWrapper() {
    const currencies = (await fetchCurrencies()).data

    return (
        <Converter currencies={currencies} />
    )
}