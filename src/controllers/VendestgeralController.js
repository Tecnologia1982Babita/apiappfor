const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {
 const dataini = parseInt(req.params.dataini);
 const datafim = parseInt(req.params.datafim);
 const codigofab = parseInt(req.params.codigofab);

 var novaDataini = "'"+dataini.toString()+"'";
 var novaDatafim = "'"+datafim.toString()+"'";




    const rows = await db.query('SELECT coalesce(venda.quantidade_peca,0) as qtd_pecas_vendidas, \r\
    coalesce(venda.venda_total,0.00) as venda_total_venda, \r\
    coalesce(venda.cod_fabricante,estoque.codigo::integer) as cod_fabricante,\r\
    coalesce(estoque.nome_fornecedor,venda.for_nom) as nome_fornecedor, \r\
    coalesce(estoque.qtd_estoque,0) as qtd_estoque, \r\
    coalesce(estoque.venda_total,0.00) as venda_total_estoque,\r\
    COALESCE((( (coalesce(venda.quantidade_peca,0)) / CASE WHEN (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) = 0 THEN 1 ELSE (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) END  )*100.00),0.00)::numeric(5,2) as giro,\r\
    coalesce(venda.preco_bruto,0.00) as preco_bruto, \r\
    coalesce(venda.desconto,0.00) as desconto \r\
from \r\
     (SELECT sum(quantidade_peca) as quantidade_peca, sum(prcvenda_x_quantidade) as venda_total, cod_fabricante, for_nom, sum(preco_cheio) as preco_bruto,sum(desconto) as desconto \r\
FROM view_base_12meses \r\
     left join erp_fornecedores on (erp_fornecedores.for_cod = view_base_12meses.cod_fabricante) \r\
     where  \r\
     view_base_12meses.data::date >= '+novaDataini+' and view_base_12meses.data::date <= '+novaDatafim+'\r\
     and cod_fabricante  \r\
in (select distinct for_cod from erp_fornecedores_vinculado where forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod = '+codigofab+')) \r\
group by cod_fabricante, for_nom order by cod_fabricante)venda \r\
full join \r\
             (SELECT sum(qtd_estoque) as qtd_estoque, sum(prcvenda_x_quantidade) as venda_total, codigo, nome_fornecedor \r\
FROM view_estoque \r\
             left join erp_fornecedores on (erp_fornecedores.for_cod = view_estoque.codigo::integer) \r\
             where codigo::integer   \r\
in (select distinct for_cod from erp_fornecedores_vinculado where forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod = '+codigofab+')) \r\
             group by codigo, nome_fornecedor order by codigo::integer)estoque on cod_fabricante = codigo::integer'); 
   

              
    
 
             return res.json(rows.rows);
  };

 
  


  


 
