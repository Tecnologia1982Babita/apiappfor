const db = require("../config/database2");

exports.createProduct  = async (requisao, res) => {
    const documento = parseInt(requisao.params.documento);
    const data = parseInt(requisao.params.data);
    const hora = parseInt(requisao.params.hora);
    const vendedor = parseInt(requisao.params.vendedor);
    const tipo = parseInt(requisao.params.tipo);
    const origem = parseInt(requisao.params.origem);
    const cancelado = parseInt(requisao.params.cancelado);
    const bloqueado = parseInt(requisao.params.bloqueado);
    const itens = parseInt(requisao.params.itens);
    const alteracoes = parseInt(requisao.params.alteracoes);
    const operador = parseInt(requisao.params.operador);
    const descontos = parseInt(requisao.params.descontos);
    const total = parseInt(requisao.params.total);

    var novaData = "'"+data.toString()+"'";
    console.log(documento,novaData);

    const rows = await db.query('INSERT INTO dfabrica(documento, data, hora, codigovend, totaldesc, totalitens, totalgeral,operador, cancelado, alteracoes, bloqueado, tipo, destino)\r\
    \r\
VALUES ('+documento+', '+novaData+', '+hora+', '+vendedor+', '+tipo+', '+origem+', '+cancelado+','+bloqueado+', '+itens+','+alteracoes+', '+operador+', '+descontos+', '+total+');')

    return res.json(rows.rows);
};