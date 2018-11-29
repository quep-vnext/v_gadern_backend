const ProductService = require('../services/ProductService');
const logService = require('../services/LogService');

async function getListProduct(request, response) {
    let startTime = new Date();
    
    let result = await ProductService.getListProduct();
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "getListProduct" },
        { key: "Param", content: null }
    ]
    await logService.accessLog(logData);

    return response.json(result);
}

async function searchProducts(request, response) {
    let startTime = new Date();
    let objSearch = {
        IdTypeMain: request.body.id_type_main,
        IdTypeChild: request.body.id_type_child,        
        FromDate: request.body.from_date,
        ToDate: request.body.to_date,
        Sort: (typeof request.body.sort === "undefined" || request.body.sort === null ? [] : request.body.sort),
        Filter: (typeof request.body.filter === "undefined" || request.body.filter === null ? [] : request.body.filter),
        Page: (typeof request.body.page === "undefined" || request.body.page === null ? 1 : request.body.page),
        PageSize: (typeof request.body.pageSize === "undefined" || request.body.pageSize === null ? 10 : request.body.pageSize)
    };
    let data = await ProductService.searchProducts(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "searchProducts" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);    
    return response.json(data);
}

module.exports = {    
    getListProduct,
    searchProducts
}