export type ConversionResponseModel = {
        date: string,
        historical: string,
        info: ConversionRateInfoModel,
        query: ConversionQueryModel,
        result: number,
        success: boolean
}

export type ConversionRateInfoModel = {

    rate: number,
    timestamp: number
}

export type ConversionQueryModel = {
    amount: number,
    from: string,
    to: string
}

