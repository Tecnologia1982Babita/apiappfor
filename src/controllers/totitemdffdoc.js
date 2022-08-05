const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const documento = parseInt(req.params.documento);
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
    

  const rows = await db.query('SELECT  documento, data, loja_origem, codigofab, sum(qtde) as quantidade, sum(prcvenda*qtde) as totalgeral\r\
  FROM public.erp_idfabric\r\
  inner join erp_fornecedores_vinculado on  erp_fornecedores_vinculado.for_cod = erp_idfabric.codigofab\r\
  where documento = '+documento+'\r\
  and data >= '+novaDataini+'  and data <= '+novaDatafim+'\r\
  GROUP BY DOCUMENTO, DATA, LOJA_ORIGEM, CODIGOFAB')


             return res.json(rows.rows);
};
