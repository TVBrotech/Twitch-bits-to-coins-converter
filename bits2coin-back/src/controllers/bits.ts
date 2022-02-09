/** src/controllers/bits.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { STATUS_CODES } from "http";

const API_KEY: string = "35e689b7dad6a6b647fd21a1fb266c4a";
const USD_CODE: string = "USD";
const EXCHANGE_API_URL_CONVERT: string = "http://api.exchangeratesapi.io/v1/latest";
const BIT_USD_VALUE: number = 0.01;


const convertion = async (request: Request, response: Response, next: NextFunction) => {
    var currency: string = request.params.currency.toLocaleUpperCase();
    var bits: number = Number(request.params.bits);
    
    const url: string = EXCHANGE_API_URL_CONVERT + '?access_key=' + API_KEY + '&base=' + currency + '&symbols=' + USD_CODE;
    
    try {
        console.log(url);
        const axiosResponse: AxiosResponse = await axios.get(url);
        const rate: number = axiosResponse.data['rates'][USD_CODE];
        console.log(rate);
        const result: number = (1 / rate) * (bits * BIT_USD_VALUE);
        return response.status(200).json({
            result: result.toFixed(4)
        });
    } catch (error) {
        return response.status(400).json({
            message: STATUS_CODES[400]
        });
    }
}

export default { convertion }