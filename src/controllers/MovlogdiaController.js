const db = require("../config/database3");
//var moment = require('moment'); 


exports.listAllProducts  = async (req, res) => {
 
   
   


    const rows = await db.query('SELECT sum(totalgeral) as total from entradas where data::date = CURRENT_DATE'); 
   

              
    
 
    return res.json(rows.rows);
  };

 
  


  


 
