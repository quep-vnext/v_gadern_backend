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

module.exports = {    
    getListProduct
}