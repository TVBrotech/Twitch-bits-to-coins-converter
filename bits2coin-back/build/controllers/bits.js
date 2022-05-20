"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const http_1 = require("http");
const API_KEY = "35e689b7dad6a6b647fd21a1fb266c4a";
const USD_CODE = "USD";
const EXCHANGE_API_URL_CONVERT = "http://api.exchangeratesapi.io/v1/latest";
const BIT_USD_VALUE = 0.01;
const convertion = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var currency = request.params.currency.toLocaleUpperCase();
    var bits = Number(request.params.bits);
    const url = EXCHANGE_API_URL_CONVERT + '?access_key=' + API_KEY + '&base=' + currency + '&symbols=' + USD_CODE;
    try {
        const axiosResponse = yield axios_1.default.get(url);
        const rate = axiosResponse.data['rates'][USD_CODE];
        const result = (1 / rate) * (bits * BIT_USD_VALUE);
        return response.status(200).json({
            result: result.toFixed(4)
        });
    }
    catch (error) {
        return response.status(400).json({
            message: http_1.STATUS_CODES[400]
        });
    }
});
exports.default = { convertion };
