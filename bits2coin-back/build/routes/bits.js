"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** src/routes/bits.ts */
const express_1 = __importDefault(require("express"));
const bits_1 = __importDefault(require("../controllers/bits"));
const router = express_1.default.Router();
router.get('/bits/:bits/:currency', bits_1.default.convertion);
module.exports = router;
