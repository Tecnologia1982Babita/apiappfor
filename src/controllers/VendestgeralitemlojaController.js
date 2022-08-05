const db = require("../config/database2");

exports.listAllProducts  = async (req,res) => {

 const dataini = parseInt(req.params.dataini);
 const datafim = parseInt(req.params.datafim);
 const codigofab = parseInt(req.params.codigofab);
 const produtos_reffor = parseInt(req.params.produtos_reffor);

 var aprodutos_reffor = "'"+produtos_reffor.toString()+"'";
 var novaDataini = "'"+dataini.toString()+"'";
 var novaDatafim = "'"+datafim.toString()+"'";


    var trasso = "'-'";

    var cat = "'CAT'";
    var varr = "'VAR'";

 

    

    const rows = await db.query('SELECT DISTINCT coalesce(venda.quantidade_peca,0) as qtd_pecas_vendidas, coalesce(venda.venda_total,0.00) as venda_total_venda, coalesce(venda.cod_fabricante,estoque.codigo::integer) as cod_fabricante, \r\
    coalesce(estoque.nome_fornecedor,venda.for_nom) as nome_fornecedor, coalesce(estoque.qtd_estoque,0) as qtd_estoque, coalesce(estoque.venda_total,0.00) as venda_total_estoque,\r\
    COALESCE((( (coalesce(venda.quantidade_peca,0)) / \r\
    CASE WHEN (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) = 0 THEN 1 \r\
    ELSE (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) END  )*100.00),0.00)::numeric(5,2) as giro, coalesce(venda.produtos_descricao,estoque.produtos_descricao) as produtos_descricao, \r\
       coalesce(venda.nome_revista, estoque.revista) as nome_revista, coalesce(venda.produtos_pagina,estoque.produtos_pagina) as produtos_pagina, \r\
       coalesce(venda.num_produto,estoque.num_produto)as num_produto, coalesce(venda.produtos_reffor,estoque.produtos_reffor)as produtos_reffor, \r\
       coalesce(venda.preco_cheio1 , estoque.venda_total/(case when qtd_estoque = 0 then 1 else qtd_estoque end))::numeric(7,2) as preco_cheio1, \r\
       coalesce(venda.produto,estoque.item::integer) as produto, coalesce(coalesce(venda.produtos_tamanho,estoque.produtos_tamanho),0) as produtos_tamanho, \r\
       coalesce(coalesce(venda.tam_nom,estoque.tam_nom),'+trasso+') as tam_nom, coalesce(coalesce(venda.produtos_cor, estoque.produtos_cor),0) as produtos_cor,\r\
  case when (coalesce(coalesce(venda.procor_descricao_cor,estoque.procor_descricao_cor),'+trasso+')) = '+trasso+' \r\
     then CASE WHEN(case when length(coalesce(venda.produto,estoque.item::integer)::character varying::text) = 6 \r\
     THEN substr(coalesce(venda.produto,estoque.item::integer)::character varying::text, 3, 1) \r\
     ELSE substr(coalesce(venda.produto,estoque.item::integer)::character varying::text, 2, 1) END)::integer = 1 then '+cat+' else '+varr+' END\r\
     else (coalesce(venda.procor_descricao_cor,estoque.procor_descricao_cor)) end as procor_descricao_cor, \r\
  coalesce(venda.lojas_nome, estoque.lojas_nome) as lojas_nome from \r\
  \r\
    (SELECT sum(quantidade_peca) as quantidade_peca, sum(prcvenda_x_quantidade) as venda_total, cod_fabricante, for_nom,\r\
    coalesce(produtos_descricao,descricao_basica) as produtos_descricao, nome_revista, coalesce(erp_produtos.produtos_pagina,'+trasso+')as produtos_pagina, \r\
       CASE WHEN length(produto::character varying::text) = 6 THEN substr(produto::character varying::text, 1, 2) ELSE \r\
       CASE WHEN length(produto::character varying::text) = 5 THEN substr(produto::character varying::text, 1, 1) ELSE \r\
       CASE WHEN length(produto::character varying::text) = 4 THEN substr(produto::character varying::text, 1, 3) ELSE \r\
            CASE WHEN length(produto::character varying::text) = 3 THEN substr(produto::character varying::text, 1, 2) ELSE \r\
            CASE WHEN length(produto::character varying::text) = 2 THEN substr(produto::character varying::text, 1, 1) ELSE \r\
            produto::character varying::text END END END END END::integer as num_produto, coalesce(produtos_reffor,'+aprodutos_reffor+') as produtos_reffor, \r\
    (CASE WHEN preco_cheio < 0 THEN preco_cheio*-1 ELSE preco_cheio END) as preco_cheio1, produto, produtos_tamanho, tam_nom, produtos_cor, procor_descricao_cor, lojas_nome\r\
    FROM view_base_12meses\r\
    left join erp_fornecedores on (erp_fornecedores.for_cod = view_base_12meses.cod_fabricante)\r\
    inner join erp_produtos on (erp_produtos.produtos_num_fornecedor = view_base_12meses.cod_fabricante and erp_produtos.produtos_num_item = view_base_12meses.produto)\r\
    left join erp_tamanho on (erp_tamanho.tam_cod = erp_produtos.produtos_tamanho)\r\
    left join erp_produtos_cor on (erp_produtos_cor.procor_cod = erp_produtos.produtos_cor)\r\
    where  \r\
    view_base_12meses.data::date between '+novaDataini+' and '+novaDatafim+'\r\
    and cod_fabricante = '+codigofab+'  and produtos_reffor::character varying::text = '+aprodutos_reffor+'  \r\
    group by cod_fabricante, for_nom, produtos_descricao, nome_revista, erp_produtos.produtos_pagina, num_produto, \r\
    produtos_reffor, preco_cheio1,descricao_basica, produto, produtos_tamanho, tam_nom, produtos_cor, procor_descricao_cor, lojas_nome order by num_produto)venda \r\
    \r\
    full join\r\
    \r\
    (SELECT sum(qtd_estoque) as qtd_estoque, sum(prcvenda_x_quantidade) as venda_total, codigo, nome_fornecedor,\r\
    coalesce(produtos_descricao, desc_basica) as produtos_descricao, revista, coalesce(erp_produtos.produtos_pagina,'+trasso+')as produtos_pagina, \r\
       CASE WHEN length(item::character varying::text) = 6 THEN substr(item::character varying::text, 1, 2) ELSE \r\
       CASE WHEN length(item::character varying::text) = 5 THEN substr(item::character varying::text, 1, 1) ELSE \r\
       CASE WHEN length(item::character varying::text) = 4 THEN substr(item::character varying::text, 1, 3) ELSE \r\
            CASE WHEN length(item::character varying::text) = 3 THEN substr(item::character varying::text, 1, 2) ELSE \r\
            CASE WHEN length(item::character varying::text) = 2 THEN substr(item::character varying::text, 1, 1) ELSE \r\
            item::character varying::text END END END END END::integer as num_produto, coalesce(produtos_reffor,'+trasso+') as produtos_reffor,\r\
    item, produtos_tamanho, tam_nom, produtos_cor, procor_descricao_cor, lojas_nome\r\
    FROM view_estoque \r\
    left join erp_fornecedores on (erp_fornecedores.for_cod = view_estoque.codigo::integer)\r\
    inner join erp_produtos on (erp_produtos.produtos_num_fornecedor = view_estoque.codigo::integer and erp_produtos.produtos_num_item = view_estoque.item::integer) left join erp_tamanho on (erp_tamanho.tam_cod = erp_produtos.produtos_tamanho)\r\
    left join erp_produtos_cor on (erp_produtos_cor.procor_cod = erp_produtos.produtos_cor)\r\
    where codigo::integer = '+codigofab+'  and produtos_reffor::character varying::text = '+aprodutos_reffor+'  \r\
    group by codigo, nome_fornecedor, produtos_descricao, revista, erp_produtos.produtos_pagina, num_produto, \r\
    produtos_reffor, item, produtos_tamanho, tam_nom, produtos_cor, procor_descricao_cor, desc_basica, lojas_nome order by num_produto)estoque \r\
    \r\
    on cod_fabricante = codigo::integer and venda.produto = estoque.item::integer and estoque.lojas_nome = venda.lojas_nome group by venda.quantidade_peca,venda.venda_total, venda.cod_fabricante,estoque.codigo,\r\
    estoque.nome_fornecedor,venda.for_nom, estoque.qtd_estoque, estoque.venda_total, giro, venda.produtos_descricao, venda.nome_revista, venda.produtos_pagina, venda.num_produto, \r\
    venda.produtos_reffor, venda.preco_cheio1, venda.produto, venda.produtos_tamanho, venda.tam_nom, venda.produtos_cor, venda.procor_descricao_cor , estoque.produtos_descricao, estoque.revista,\r\
         estoque.produtos_pagina, estoque.num_produto, estoque.produtos_reffor, estoque.item, estoque.produtos_tamanho, estoque.tam_nom, estoque.produtos_cor, estoque.procor_descricao_cor,\r\
         estoque.lojas_nome, venda.lojas_nome order by lojas_nome, produtos_tamanho')
       
    
 
             return res.json(rows.rows);
  };

 
  


  


 
