//check logic in services before call to model
'use strict';
const RiyoModel = require('../models/T_Riyo');
const ResCode = require('../util/validation').RESPONSE_CODE;
const validation = require('../util/validation');


//#region only kanri -------------------------------------------------------------------------------------
async function searchRiyo(objSearch) {    
    let requiredFields = [
        'UserName',
        'Email'
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
    let result = await RiyoModel.searchRiyo(objSearch);
    console.log(result);
    if (result !== "undefined") {
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
//#endregion

module.exports = {    
    searchRiyo
}