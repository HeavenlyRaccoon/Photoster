const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  login: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  nickname: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
});

const Followers = sequelize.define("followers", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.DATE, allowNull: false },
});

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  time: { type: DataTypes.DATE, allowNull: false },
});

const Photo = sequelize.define("photo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.DATE, allowNull: false },
});

const Post_like = sequelize.define("post_like", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

const Comment_like = sequelize.define("comment_like", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

User.belongsToMany(User, { as: "Followed", through: Followers });

User.belongsToMany(User, { as: "Receiver", through: Message });

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Photo);
Photo.belongsTo(Post);

Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Post_like);
Post_like.belongsTo(Post);
User.hasMany(Post_like);
Post_like.belongsTo(User);

Comment.hasMany(Comment_like);
Comment_like.belongsTo(Comment);
User.hasMany(Comment_like);
Comment_like.belongsTo(User);

module.exports = {
  User,
  Followers,
  Message,
  Post,
  Photo,
  Comment,
  Post_like,
  Comment_like,
};
