const { Model, DataTypes } = require('sequelize');

class view_estoque extends Model {
  static init(sequelize) {
    super.init({

   /*   bas12meses_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },*/
     est_cod :{
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      

      prcvenda_x_quantidade: DataTypes.NUMBER,

      qtd_estoque: DataTypes.NUMBER
    
    
    
   
    }, 

   

    
    
    {
      sequelize
    })
  }
  
}




module.exports = view_estoque;