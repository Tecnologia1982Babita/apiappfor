const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const for_cod = parseInt(req.params.for_cod);

    const rows = await db.query('select distinct erp_fornecedores_vinculado.for_cod,for_nom from erp_fornecedores_vinculado \r\
    inner join erp_fornecedores on erp_fornecedores.for_cod = erp_fornecedores_vinculado.for_cod \r\
    where forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod = '+for_cod+') \r\
    order by erp_fornecedores_vinculado.for_cod  desc')
     
               
    
 
             return res.json(rows.rows);
  };

 
  
