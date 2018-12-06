'use strict';

const ResCode = require('../util/validation').RESPONSE_CODE;
const validation = require('../util/validation');

const ProductModel = require('../models/T_Product');

async function getProducts(objSearch) {
    let result = await ProductModel.getProducts(objSearch);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: result.data,
            totalRecord: result.totalRecord
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

module.exports = {    
    getProducts
}