const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const codigofab = parseInt(req.params.codigofab);
   
     
    const rows = await db.query('Select distinct produtos_numero, produtos_descricao, produtos_preco, for_nom, for_cod\r\
    From public.erp_produtos\r\
    inner join erp_fornecedores on erp_fornecedores.for_cod = erp_produtos.produtos_num_fornecedor\r\
    where produtos_num_fornecedor = '+codigofab+'\r\
      ')
     
               

             return res.json(rows.rows);
  };

 
  


  


 
