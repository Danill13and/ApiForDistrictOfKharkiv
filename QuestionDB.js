const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize('questions', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

const Question = sequelize.define('Question', {
    name: {
        type: DataTypes.STRING,
    },
    answer1: {
        type: DataTypes.STRING,
    },
    answer2: {
        type: DataTypes.STRING,
    },
    answer3: {
        type: DataTypes.STRING,
    },
    answer4: {
        type: DataTypes.STRING,
    },
    corectanswer: {
        type: DataTypes.STRING,
    }
})

sequelize.authenticate()
// sequelize.sync()

module.exports = Question