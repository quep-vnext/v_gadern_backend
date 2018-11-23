'use strict';
const baseModel = require('../base/BaseModel');
const validation = require('../util/validation');
const DB = require('../util/db_util');

const logService = require('../services/LogService');

//#region only kanri -------------------------------------------------------------------------------------
async function searchRiyo(objSearch) {                
    let dataReturn;    
    var para_array=[objSearch.UserName, objSearch.Email]
    let sqlStr = `SELECT * FROM user WHERE username=? OR email=? `;
    
    if (!validation.isEmptyObject(objSearch.ToDate)) {
        sqlStr += ` AND updated_date <= ?`;
        para_array.push(objSearch.ToDate)
    }
    if (!validation.isEmptyObject(objSearch.FromDate)) {
        sqlStr += ` AND updated_date >= ?`;
        para_array.push(objSearch.FromDate);
    }
/*
    let orderStr = await baseModel.buildOrder(objSearch, fieldWhiteList, `CreateDate`);
    let strFilter = await baseModel.buildFilter(objSearch, fieldWhiteList, sqlRequest);

    let sqlCount = `SELECT COUNT(A.RiyoNo) row_count FROM (` + sqlStr + `) A WHERE 1 = 1` + strFilter + ";"
    sqlStr = `WITH query AS (SELECT ROW_NUMBER() OVER(` + orderStr + `) AS line, * FROM (` + sqlStr + `) A WHERE 1 = 1` + strFilter +`) SELECT TOP (@PageSize) * FROM query WHERE line > (@Page - 1) * @PageSize;`;
    sqlStr += sqlCount;
*/
    let query = new Promise(function (resolve, reject) {
        connection.query(sqlStr, para_array, async function(err, result, fields) {
            if(result) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
    await query.then(async function(res) {
        dataReturn = res;
        let logData = [
            { key: "Time", content: new Date() },
            { key: "File", content: "T_Riyo.js" },
            { key: "Function", content: "searchRiyo" },
            { key: "Sql", content: sqlStr },
            { key: "Param", content: para_array }
        ]
        await logService.sqlLog(logData);            
    }).catch(async function(err) {
        let logData = [
            { key: "Time", content: new Date() },
            { key: "File", content: "T_Riyo.js" },
            { key: "Function", content: "searchRiyo" },
            { key: "Table", content: "user" },
            { key: "Param", content: para_array },
            { key: "Err", content: err }
        ]
        await logService.errorLog(logData);
        
        return false;
    });
    return(dataReturn);
}
//#endregion

module.exports = {    
    searchRiyo
}