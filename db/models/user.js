'use strict';
const {
  Model
} = require('sequelize');
// import bcrypt to encrypt password
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static register = async ({ username, password }) => { 
        try { 
            const encryptedPassword = await bcrypt.hash(password, 10);

            return this.create({ username, password: encryptedPassword })
        } catch(err) { 
            next(err)
        }
    };

    // to check the password later
    checkPassword = password => bcrypt.compareSync(password, this.password)


    // for authenticating the User based on the username and password
    static authenticate = async ({ username, password }) => { 
        try { 
            const user = await this.findOne({where: { username }});
            if (!user) return Promise.reject("User Not Found");
            const isPasswordValid = user.checkPassword(password);
            if (!isPasswordValid) return Promise.reject("Wrong Password");   
            return Promise.resolve(user);
        } catch(err) { 
            return Promise.reject(err);
        }
    };

    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
