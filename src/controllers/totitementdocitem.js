const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const documento = parseInt(req.params.documento);
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
    

  const rows = await db.query('SELECT  documento, data, loja_origem, codigofab, codigopro, prcbasico, qtde as quantidade, prcvenda*qtde as totalgeral, prcvenda\r\
  FROM public.erp_ientrada\r\
  where documento = '+documento+'\r\
  and data >= '+novaDataini+'  and data <= '+novaDatafim+'\r\
')


         return res.json(rows.rows);
};
