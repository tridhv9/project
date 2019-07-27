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
    async procedure(paramter)
    {
        await sql.ConnectionPool(db_config)
        var request = new sql.Request();
        request.input('input_parameter', sql.Int, 10);
        request.output('output_parameter', sql.VarChar(50));
        request.execute('procedure_name', function(err, recordsets, returnValue) {
            // ... error checks

            console.dir(recordsets);
    });
    }

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