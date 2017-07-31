import bcrypt from 'bcrypt'

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  Users.hook('beforeCreate', (user) => {
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(user.password, salt)
  })

  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword)
  }

  Users.associate = (models) => {
    Users.hasMany(models.Tasks)
  }

  return Users
}
