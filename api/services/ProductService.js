//check logic in services before call to model
'use strict';
const ProductModel = require('../models/T_Product');
const ResCode = require('../util/validation').RESPONSE_CODE;
const validation = require('../util/validation');

async function getListProduct() {    
    let data = await ProductModel.getListProduct();
    if (data) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: data
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

module.exports = {    
    getListProduct
}