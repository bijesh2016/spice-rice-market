const slugify = require("slugify");
const fileUploadSvc = require("../../services/file-upload.service");
const BannerModel = require("./banner.model");

class BannerService {
  transformCreatePayload = async (req) => {
    const data = { ...req.body };

    if (data.title) {
      data.slug = slugify(data.title.replace("'", "").replace('"', ""), {
        lower: true,
      });
    }

    if (req.file) {
      const uploaded = await fileUploadSvc.fileupload(req.file.path, "banner/");
      data.image = uploaded.url;
    }

    if (req.loggedInUser?._id) {
      data.createdBy = req.loggedInUser._id;
    }

    return data;
  };

  transformUpdatePayload = async (req, oldData) => {
    const data = { ...req.body };

    if (data.title) {
      data.slug = slugify(data.title.replace("'", "").replace('"', ""), {
        lower: true,
      });
    }

    if (req.file) {
      const uploaded = await fileUploadSvc.fileupload(req.file.path, "banner/");
      data.image = uploaded.url;
    } else {
      data.image = oldData.image;
    }

    if (req.loggedInUser?._id) {
      data.updatedBy = req.loggedInUser._id;
    }

    return data;
  };

  createBanner = async (payload) => {
    const banner = new BannerModel(payload);
    return await banner.save();
  };

  getAllList = async (query, filter = {}) => {
    const limit = +query.limit || 10;
    const page = +query.page || 1;
    const skip = (page - 1) * limit;

    const data = await BannerModel.find(filter)
      .populate("createdBy", ["_id", "name", "email", "role", "image"])
      .populate("updatedBy", ["_id", "name", "email", "role", "image"])
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    const total = await BannerModel.countDocuments(filter);

    return {
      data,
      pagination: { page, limit, total },
    };
  };

  getSingleRowByFilter = async (filter) => {
    return await BannerModel.findOne(filter)
      .populate("createdBy", ["_id", "name", "email", "role", "image"])
      .populate("updatedBy", ["_id", "name", "email", "role", "image"]);
  };

  updateSingleDataByFilter = async (filter, data) => {
    return await BannerModel.findOneAndUpdate(filter, { $set: data }, { new: true });
  };

  deleteSingleRowByFilter = async (filter) => {
    return await BannerModel.findOneAndDelete(filter);
  };
}

module.exports = new BannerService();
