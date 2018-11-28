'use strict';
const baseModel = require('../base/BaseModel');
const validation = require('../util/validation');
const logService = require('../services/LogService');

async function getListProduct(objSearch) {                
    let dataReturn;    
    let sqlStr = `SELECT T1.id AS id_type_child,T1.name AS child_name,
                    T2.id AS id_type_main,T2.name AS parent_name,
                    T3.id AS product_id, T3.name AS product_name, T3.category_id AS product_category_id,
                    T3.discount AS sale_percent, T3.created_date, T3.updated_date
                    FROM category T1
                    JOIN category T2
                    ON T1.parent_id=T2.id
                    JOIN product T3
                    ON T3.category_id=T1.id
                    WHERE T2.parent_id=0`;
    
    let query = new Promise(function (resolve, reject) {
        connection.query(sqlStr, async function(err, result, fields) {
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
            { key: "File", content: "T_Product.js" },
            { key: "Function", content: "getListProduct" },
            { key: "Sql", content: sqlStr },
            { key: "Param", content: null }
        ]
        await logService.sqlLog(logData);            
    }).catch(async function(err) {
        let logData = [
            { key: "Time", content: new Date() },
            { key: "File", content: "T_Product.js" },
            { key: "Function", content: "getListProduct" },
            { key: "Table", content: "Product" },
            { key: "Param", content: null },
            { key: "Err", content: err }
        ]
        await logService.errorLog(logData);
        
        return false;
    });
    return(dataReturn);
}

module.exports = {    
    getListProduct
}