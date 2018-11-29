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

async function searchProducts(objSearch) {    
    let requiredFields = [
        'IdTypeMain',
        'IdTypeChild'
    ]
    let checkRequired = validation.checkRequiredFields(objSearch, requiredFields);
    if (checkRequired.required) {
        let result = {
            code: ResCode.REQUIRED,
            message: 'Parameter(s) is required!',
            data: checkRequired
        };
        return result;
    }
    let result = await ProductModel.searchProducts(objSearch);    
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: result
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

module.exports = {    
    getListProduct,
    searchProducts
}