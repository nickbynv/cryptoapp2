interface IValues {
    USD: {
        price: number
        volume24h: any
        high24h: number
        low24h: number
        marketCap: number
        percentChange24h: number
        percentChange7d: number
        percentChange30d: number
        percentChange3m: number
        percentChange6m: number
    }
}

interface IPlatform {
    id: number
    name: string
    slug: string
}

interface IToken {
    tokenAddress: string
    platform: IPlatform
}

export interface ICurrency {
    id: number
    rank: number
    slug: string
    name: string
    symbol: string
    category: string
    type: string
    volume24hBase: number
    circulatingSupply: any
    totalSupply: any
    maxSupply: any
    values: IValues
    lastUpdated: Date
    tokens: IToken[]
}

export interface IConvertCurrency {
    symbol: string
    price: number
    icon: string
}

export interface ICurrenciesResponse {
    data: ICurrency[]
    meta: {
        count: number
    }
    status: {
        time: Date
        success: boolean
        code: number
        message: string
        responseTime: number
        creditsCost: number
    }
}