const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    var doispontos = "':'";

    const rows = await db.query('select dat_inc, (extract(hour from dat_inc)||'+doispontos+'||extract(minute from dat_inc))::character varying \r\
    as movfor_hora FROM view_base_12meses order by dat_inc asc limit 1')
     
               
    
 
             return res.json(rows.rows);
  };

 
  


  


 
