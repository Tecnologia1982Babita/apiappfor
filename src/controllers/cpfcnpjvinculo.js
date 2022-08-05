const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const forvin_cod = parseInt(req.params.forvin_cod);

    const rows = await db.query('select fv_fabricantes_cnpj from erp_fornecedores_vinculado where forvin_cod = '+forvin_cod+' limit 1 ')
     
               
    
 
             return res.json(rows.rows);
  };

 
  


  


 
