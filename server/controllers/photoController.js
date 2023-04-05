const { Photo } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class PhotoController {
  async create(req, res, next) {
    try {
      const { postId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpeg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const photo = await Photo.create({ postId, img: fileName });
      return res.json(photo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { postId } = req.query;
      let photo;
      photo = await Photo.findOne({
        where: { postId },
      });
      return res.json(photo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const photo = await Photo.findOne({ where: { id } });

      return res.json(photo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PhotoController();
