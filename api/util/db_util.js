'use_strict';

const systemConfig = require('config');
const sql = require('mysql');
let initialized = false;
let sqlConnect = null;
let connection = null;



async function dbConnect () {
    let sqlConfig = systemConfig.get("TestENV.dbConfig");
    // add encrypt = false for connect to test env - not azure
    sqlConfig.options = {
        "encrypt": false
    }
    connection = sql.createConnection(sqlConfig);    
    try{
        sqlConnect = connection.connect();        
    } catch (err) {
        return false;
    }    
    return connection;
}



module.exports = {
    sql,
    sqlConnect,
    dbConnect,
    connection
}