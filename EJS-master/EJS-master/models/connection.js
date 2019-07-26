var sql = require('mssql/msnodesqlv8');
const db_config = {
    userName: 'sa', // update
    password: '3s@dimension', // update
    server: 'localhost',
    database: 'PSA',
    options: {
        // update   
        trustedConnection: true,
        useUTC: true
    }
}
class connection
{

    async connect(query) {
        console.log(query)
        return new sql.ConnectionPool(db_config).connect().then(pool => {
            return pool.request().query(query)
             }).then(result => {
               let rows = result.recordset 
               sql.close();
               return JSON.stringify(rows)
            }).catch(err => {
                 console.log(err)
                 sql.close();
            });
    
        
    } 
}
module.exports=new connection()