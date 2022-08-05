const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

  

    const rows = await db.query('SELECT distinct lojas_nome FROM public.view_base_12meses order by lojas_nome')
     
               
    
 
             return res.json(rows.rows);
  };

 
  
