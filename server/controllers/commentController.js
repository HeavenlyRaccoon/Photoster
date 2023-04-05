const { Comment } = require("../models/models");
const ApiError = require("../error/ApiError");

class CommentController {
  async create(req, res, next) {
    try {
      const { postId, userId, text, time } = req.body;
      const comment = await Comment.create({ postId, userId, text, time });
      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { postId } = req.query;
      let comments;
      comments = await Comment.findAndCountAll({
        where: { postId },
      });
      return res.json(comments);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findOne({ where: { id } });

      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CommentController();
