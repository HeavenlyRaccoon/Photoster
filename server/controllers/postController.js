const { Post } = require("../models/models");
const ApiError = require("../error/ApiError");

class PostController {
  async create(req, res, next) {
    try {
      const { userId, time } = req.body;
      const post = await Post.create({ userId, time });
      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { userId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let posts;
      posts = await Post.findAndCountAll({
        where: { userId },
        limit,
        offset,
      });
      return res.json(posts);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ where: { id } });

      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PostController();
