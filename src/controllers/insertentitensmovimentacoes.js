const db = require("../config/database2");

exports.createProduct  = async (requisao, res) => {
    const documento = parseInt(requisao.params.documento);
    const data = parseInt(requisao.params.data);
    const hora = parseInt(requisao.params.hora);
    const fornecedor = parseInt(requisao.params.fornecedor);
    const item = parseInt(requisao.params.item);
    const dbasica = parseInt(requisao.params.dbasica);
    const quantidade = parseInt(requisao.params.quantidade);
    const preco = parseInt(requisao.params.preco);
    const desconto = parseInt(requisao.params.desconto);
    const total = parseInt(requisao.params.total);
    const operador = parseInt(requisao.params.operador);
    const alteracoes = parseInt(requisao.params.alteracoes);
    

    var novaData = "'"+data.toString()+"'";
    console.log(documento,novaData);

    const rows = await db.query('INSERT INTO ientrada(documento, codigofab, codigopro, codigobas, qtde, prcbasico,desconto, prcvenda, operador, data, hora, grupo)\r\
    \r\
VALUES ( '+documento+','+novaData+', '+hora+','+fornecedor+',  '+item+',  '+dbasica+', '+quantidade+', '+preco+', '+desconto+',  '+total+',  '+operador+',  '+alteracoes+')');
    return res.json(rows.rows);
};