const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const codigofab = parseInt(req.params.codigofab);
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
    var codigofab1 = "'"+codigofab.toString()+"'";

console.log(novaDataini, novaDatafim, codigofab1);

  const rows = await db.query('SELECT sum(qtde) as quantidade, sum(prcvenda*qtde) as totalgeral\r\
FROM public.erp_idfabric\r\
inner join erp_fornecedores_vinculado on  erp_fornecedores_vinculado.for_cod = erp_idfabric.codigofab\r\
where codigofab in (select distinct for_cod from erp_fornecedores_vinculado where forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod ='+codigofab1+'))\r\
and data >= '+novaDataini+'  and data <= '+novaDatafim+'\r\
')
     

             return res.json(rows.rows);
  };

