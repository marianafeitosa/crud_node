//arquivo so pro banco
const Sequelize = require ('sequelize')
    const sequelize=new Sequelize('projetoweb', 'root', '',{
        host:'localhost',
        dialect:'mysql'
    })


    //exportando constanstes chamando o arquivo 
    module.exports ={
        Sequelize:Sequelize, //API 
        sequelize:sequelize
    }