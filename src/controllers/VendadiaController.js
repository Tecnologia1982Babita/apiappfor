const Vendas = require('../models/Vendas');
const sequelize = require("sequelize");

const Op = sequelize.Op;

module.exports = {
  async index(req, res) {
   const {for_cod} = req.params;
   const {data} = req.params;
   

  
    const view_base_12meses = await Vendas.findAll({
     
      attributes: [
       
        [sequelize.fn('sum', sequelize.col('quantidade_peca')), 'totalpeca'],
        [sequelize.fn('sum', sequelize.col('prcvenda_x_quantidade')), 'total'],
        
    ],
   

      where: { 
   
      
     cod_fabricante: { [Op.in]: sequelize.literal('(select distinct for_cod from erp_fornecedores_vinculado where forvin_cod = (select forvin_cod from erp_fornecedores_vinculado where for_cod ='+for_cod+'))')},

     
 

     data:data
     
     


      },
     
    });

    
 
    return res.json(view_base_12meses);
  },

  async store(req, res) {
    const {usu_login} = req.body;

    const view_base_12meses = await Vendas.create({usu_login});
 
    return res.json(view_base_12meses);
  },

  async delete(req, res) {
    const {usu_cod} = req.params;
  
    const view_base_12meses = await Vendas.findByPk(usu_cod);

    if (!view_base_12meses){
      return res.status(400).json({error: 'nao localizado'})
    }

    await Vendas.destroy({
      where: {
        usu_cod
      }
    });

    return res.json();
  },
  


  

};