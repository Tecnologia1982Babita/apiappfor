const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const codigofab = parseInt(req.params.codigofab);
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
    var codigofab1 = "'"+codigofab.toString()+"'";

console.log(novaDataini, novaDatafim, codigofab1);

  


 const rows = await db.query(' SELECT  documento, data, loja_origem, codigofab, sum(qtde) as quantidade, sum(prcvenda*qtde) as totalgeral\r\
  FROM public.erp_ientrada\r\
  inner join erp_fornecedores_vinculado on  erp_fornecedores_vinculado.for_cod = erp_ientrada.codigofab\r\
  where codigofab = '+codigofab1+'\r\
  and data >= '+novaDataini+'  and data <= '+novaDatafim+'\r\
  GROUP BY DOCUMENTO, DATA, LOJA_ORIGEM, CODIGOFAB')


        return res.json(rows.rows);

       
 };



 

