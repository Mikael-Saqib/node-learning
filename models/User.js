const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', { // When we write User it goes in User Tbale and when users, it goes in users table
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {  // Add isAdmin flag
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};
