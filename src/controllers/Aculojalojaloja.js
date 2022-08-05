const db = require("../config/database2");

exports.listAllProducts  = async (req, res) => {

    const dataini = parseInt(req.params.dataini);
    const datafim = parseInt(req.params.datafim);
    const codigofab = parseInt(req.params.codigofab);
    const lojanome = req.params.lojanome;
   
    var novaDataini = "'"+dataini.toString()+"'";
    var novaDatafim = "'"+datafim.toString()+"'";
    var alojanome = "'"+lojanome.toString()+"'";
    var trasso = "'-'";    

    const rows = await db.query('SELECT coalesce(venda.quantidade_peca,0) as qtd_pecas_vendidas, coalesce(venda.venda_total,0.00) as venda_total_venda, \r\
    coalesce(venda.cod_fabricante,estoque.codigo::integer) as cod_fabricante,\r\
    coalesce(estoque.nome_fornecedor,venda.for_nom) as nome_fornecedor, coalesce(estoque.qtd_estoque,0) as qtd_estoque, \r\
    coalesce(estoque.venda_total,0.00) as venda_total_estoque,\r\
    COALESCE((( (coalesce(venda.quantidade_peca,0)) / \r\
    CASE WHEN (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) = 0 THEN 1 \r\
    ELSE (coalesce(venda.quantidade_peca,0)+coalesce(estoque.qtd_estoque,0)) END  )*100.00),0.00)::numeric(5,2) as giro, \r\
    coalesce(venda.produtos_descricao,estoque.produtos_descricao) as produtos_descricao, \r\
    coalesce(venda.nome_revista, estoque.revista) as nome_revista, coalesce(venda.produtos_pagina,estoque.produtos_pagina) as produtos_pagina, \r\
    coalesce(venda.num_produto,estoque.num_produto)as num_produto, coalesce(venda.produtos_reffor,estoque.produtos_reffor)as produtos_reffor, \r\
    coalesce(venda.preco_cheio1 , estoque.venda_total/(case when qtd_estoque = 0 then 1 else qtd_estoque end))::numeric(7,2) as preco_cheio1, \r\
    coalesce(venda.lojas_nome,estoque.lojas_nome)as lojas_nome from \r\
    \r\
    (SELECT sum(quantidade_peca) as quantidade_peca, sum(prcvenda_x_quantidade) as venda_total, cod_fabricante, for_nom,\r\
    coalesce(produtos_descricao,descricao_basica) as produtos_descricao, nome_revista, \r\
    coalesce(erp_produtos.produtos_pagina,'+trasso+')as produtos_pagina, \r\
    CASE WHEN length(produto::character varying::text) = 6 THEN substr(produto::character varying::text, 1, 2) ELSE \r\
    CASE WHEN length(produto::character varying::text) = 5 THEN substr(produto::character varying::text, 1, 1) ELSE \r\
    CASE WHEN length(produto::character varying::text) = 4 THEN substr(produto::character varying::text, 1, 3) ELSE \r\
                           CASE WHEN length(produto::character varying::text) = 3 THEN substr(produto::character varying::text, 1, 2) ELSE \r\
                           CASE WHEN length(produto::character varying::text) = 2 THEN substr(produto::character varying::text, 1, 1) ELSE \r\
                           produto::character varying::text END END END END END::integer as num_produto, coalesce(produtos_reffor,'+trasso+') as produtos_reffor, \r\
    (CASE WHEN preco_cheio < 0 THEN preco_cheio*-1 ELSE preco_cheio END) as preco_cheio1, lojas_nome, nomefabrica\r\
    FROM view_base_12meses\r\
    left join erp_fornecedores on (erp_fornecedores.for_cod = view_base_12meses.cod_fabricante)\r\
    inner join erp_produtos on (erp_produtos.produtos_num_fornecedor = view_base_12meses.cod_fabricante \r\
    and erp_produtos.produtos_num_item = view_base_12meses.produto)\r\
    where  \r\
    view_base_12meses.data::date between '+novaDataini+' and '+novaDatafim+'\r\
    and cod_fabricante = '+codigofab+'    and lojas_nome ilike '+alojanome+' \r\
    group by cod_fabricante, for_nom, produtos_descricao, nome_revista, erp_produtos.produtos_pagina, num_produto, \r\
    produtos_reffor, preco_cheio1, descricao_basica,lojas_nome, nomefabrica order by num_produto)venda \r\
    full join\r\
    \r\
    (SELECT sum(qtd_estoque) as qtd_estoque, sum(prcvenda_x_quantidade) as venda_total, codigo, nome_fornecedor,\r\
    coalesce(produtos_descricao, desc_basica) as produtos_descricao, revista, \r\
                           coalesce(erp_produtos.produtos_pagina,'+trasso+')as produtos_pagina, \r\
    CASE WHEN length(item::character varying::text) = 6 THEN substr(item::character varying::text, 1, 2) ELSE \r\
    CASE WHEN length(item::character varying::text) = 5 THEN substr(item::character varying::text, 1, 1) ELSE \r\
    CASE WHEN length(item::character varying::text) = 4 THEN substr(item::character varying::text, 1, 3) ELSE \r\
                           CASE WHEN length(item::character varying::text) = 3 THEN substr(item::character varying::text, 1, 2) ELSE \r\
                           CASE WHEN length(item::character varying::text) = 2 THEN substr(item::character varying::text, 1, 1) ELSE \r\
                           item::character varying::text END END END END END::integer as num_produto, coalesce(produtos_reffor,'+trasso+') as produtos_reffor, lojas_nome, nomfant\r\
    FROM view_estoque \r\
    left join erp_fornecedores on (erp_fornecedores.for_cod = view_estoque.codigo::integer)\r\
    inner join erp_produtos on (erp_produtos.produtos_num_fornecedor = view_estoque.codigo::integer and erp_produtos.produtos_num_item = view_estoque.item::integer) \r\
    where codigo::integer = '+codigofab+'  and lojas_nome ilike '+alojanome+'\r\
    group by codigo, nome_fornecedor, produtos_descricao, revista, erp_produtos.produtos_pagina, num_produto, \r\
    produtos_reffor, desc_basica,lojas_nome, nomfant order by num_produto)estoque \r\
    \r\
    on cod_fabricante = codigo::integer and venda.num_produto = estoque.num_produto order by num_produto')
     
               
  
 
             return res.json(rows.rows);

            
  };

  
 
  


  


 
