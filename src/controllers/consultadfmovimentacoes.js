const db = require("../config/database2");

exports.listAllProducts  = async (requisao, res) => {
    const documento = parseInt(requisao.params.documento);
    const data = parseInt(requisao.params.data);

    var novaData = "'"+data.toString()+"'";
    console.log(documento,novaData);

    const rows = await db.query('SELECT documento, data, hora,  totalgeral, totalitens,codigovend, operador, destino\r\
    FROM public.dfabrica\r\
    where data = '+novaData+' and documento = '+documento+'')

    return res.json(rows.rows);
};