const RiyoService = require('../services/RiyoService');
const logService = require('../services/LogService');

//#region only kanri -------------------------------------------------------------------------------------
async function searchRiyo(request, response) {
    let startTime = new Date();
    let objSearch = {
        UserName: request.body.user_name,
        Email: request.body.email,        
        FromDate: request.body.from_date,
        ToDate: request.body.to_date,
        Sort: (typeof request.body.sort === "undefined" || request.body.sort === null ? [] : request.body.sort),
        Filter: (typeof request.body.filter === "undefined" || request.body.filter === null ? [] : request.body.filter),
        Page: (typeof request.body.page === "undefined" || request.body.page === null ? 1 : request.body.page),
        PageSize: (typeof request.body.pageSize === "undefined" || request.body.pageSize === null ? 10 : request.body.pageSize)
    };
    let data = await RiyoService.searchRiyo(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "RiyoController.js" },
        { key: "Function", content: "searchRiyo" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);    
    return response.json(data);
}

//#endregion

module.exports = {    
    searchRiyo
}