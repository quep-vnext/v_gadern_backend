const ProductService = require('../services/ProductService');
const logService = require('../services/LogService');

async function getProducts(request, response) {
    let startTime = new Date();
    let objSearch = {
        name: request.body.name,
        category_id: request.body.category_id,
        discount: request.body.discount,
        favorite: request.body.favorite,
        price_M: request.body.price_M,
        price_L: request.body.price_L,

        Sort: (typeof request.body.sort === "undefined" || request.body.sort === null ? [] : request.body.sort),
        Filter: (typeof request.body.filter === "undefined" || request.body.filter === null ? [] : request.body.filter),
        Page: (typeof request.body.page === "undefined" || request.body.page === null ? 1 : request.body.page),
        PageSize: (typeof request.body.pageSize === "undefined" || request.body.pageSize === null ? 10 : request.body.pageSize)
    };
    let data = await ProductService.getProducts(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "getProducts" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

module.exports = {
    getProducts
}