const { Model, DataTypes } = require('sequelize');

class view_base_12meses extends Model {
  static init(sequelize) {
    super.init({

   /*   bas12meses_cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },*/
      cod_fabricante:{
        type: DataTypes.STRING,
        primaryKey: true,
      },

      

      quantidade_peca: DataTypes.NUMBER
    
    
    
   
    }, 

   

    
    
    {
      sequelize
    })
  }
  
}




module.exports = view_base_12meses;