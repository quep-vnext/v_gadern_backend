'use strict';

var bodyParser = require('body-parser');
const express = require('express');
const systemConfig = require('config');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var xssFilters = require('xss-filters');

const riyoController = require('../controllers/RiyoController');
//const userController = require('../controllers/UserController');

const commonUtil = require('../util/common');

//defined by below NotAuthen array
const NotAuthen = [
    '/kanri/api/login',
    '/kanri/api/searchRiyo'
];

var router = express.Router();

// for using http json, urlencode
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cors());

//#region check token -------------------------------------------------------------------------------------

router.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    let orgUrl = req.originalUrl;

    // xss filter
    Object.keys(req.body).forEach(function(key, index) {
        if (typeof req.body[key] !== "undefined" && req.body[key] !== null) {
            if (!commonUtil.stringIsNumber(req.body[key])) {
                //req.body[key] = xssFilters.inHTMLData(req.body[key]);
            }
        }
    });

    if (orgUrl.substr(0, orgUrl.lastIndexOf('?')) === "/kanri/api/getFileImg") {
        token = req.query.token;
    }
    else if (orgUrl.substr(0, orgUrl.lastIndexOf('?')) === "/kanri/api/getFileRelation") {
        token = req.query.token;
    }
    else if (orgUrl.substr(0, orgUrl.lastIndexOf('?')) === "/kanri/api/getMessageImg") {
        token = req.query.token;
    }

    if (NotAuthen.indexOf(orgUrl) >= 0) {
        return next();
    }
    if (!token) {
        return res.status(401).send({ code: '401', message: 'No token provided.' });
    } else {
        //check validate token
        jwt.verify(token, systemConfig.get('TestENV.token.seed'), function(err, decoded){
            if (err) return res.status(401).json({
                code: '401',
                message: 'Failed to authenticate token.'
            });
            req.body.tokenData = decoded;
            return next();
        });
    }
});

//#endregion

//#region user's API --------------------------------------------------------------------------------------

/**
 * Login API
 */
router.post('/api/login', function(req, res){
    return userController.kanriLogin(req, res);
});

/**
* search customer
*/
router.post('/api/searchCustomer', function(req, res){
    return userController.searchCustomer(req, res);
});

/**
 * Authen guard
 */
router.post('/api/getUserInfo', function(req, res){
    return userController.getUserInfo(req, res);
});

/**
 * Update customer
 */
router.post('/api/updateCustomer', function(req, res){
    return userController.updateCustomer(req, res);
});

/**
 * Delete customer
 */
router.post('/api/deleteCustomer', function(req, res){
    return userController.deleteCustomer(req, res);
});

/**
* search target customer
*/
router.post('/api/searchTargetCustomer', function(req, res){
    return userController.searchTargetCustomer(req, res);
});

/**
 * Get customer info
 */
router.post('/api/getCustomerInfo', function(req, res){
    return userController.getCustomerInfo(req, res);
});


/**
* search riyo
*/
router.post('/api/searchRiyo', function(req, res){    
    return riyoController.searchRiyo(req, res);
});

//#endregion


/**
 * Catch server err for request
 */
router.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
        ok: false,
        message: 'Server error!'
    });
});

/**
 * Catch 404 err for request
 */
router.use(function (req, res, next) {
    res.status(404).send('NotFound URL!');
})

//#endregion

module.exports = router;