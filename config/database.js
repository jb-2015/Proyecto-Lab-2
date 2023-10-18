//config/database.js

const { Sequelize } = require('sequelize');



    const sequelize = new Sequelize('sis_lab', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
    },{
        define: {
            scopes:{
                excludeCreatedAtUpdateAt:{
                    attributes:{
                    exclude:['createdAt','updatedAt']
                },
                },
            },
            timestamps: false,
        }
    });
    

    
   module.exports= sequelize