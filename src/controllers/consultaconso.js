const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const codigofab = parseInt(req.params.codigofab);
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
     

    const rows = await db.query('SELECT  ano, mes, documento, quinzena,	codigofabricante, nome_revista,	fabpro,	produtos_pagina, produto, sum( prcvenda_x_quantidade),	sum(desconto), sum(quantidade_peca)\r\
    FROM public.view_base_12meses\r\
    inner join erp_fornecedores_vinculado on  erp_fornecedores_vinculado.for_cod = view_base_12meses.cod_fabricante\r\
    where data >= '+novaDataini+' and data <= '+novaDatafim+' and forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod = '+codigofab+')\r\
    Group by  ano, mes, documento, quinzena,	codigofabricante, nome_revista,	fabpro,	produtos_pagina, produto')
     
               


             return res.json(rows.rows);
  };

 
  


  


 
