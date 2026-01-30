const fileUploadSvc = require("../../services/file-upload.service");
const slugify = require("slugify");
const BrandModel = require("./brand.model");

class BrandService {
  transformCreatePayload = async (req) => {
    try {
      let data = req.body;
      data.slug = slugify(data.name.replace("'", "").replace('"', ""), {
        lower: true,
      });
      if (req.file) {
        data.image = await fileUploadSvc.fileupload(req.file.path, "brand/");
      }
      data.createdBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  transformUpdatePayload = async (req, oldData) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = await fileUploadSvc.fileupload(req.file.path, "brand/");
      } else {
        data.image = oldData.image;
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  createBrand = async (payload) => {
    try {
      const brand = new BrandModel(payload);
      return await brand.save();
    } catch (exception) {
      throw exception;
    }
  };

  getAllList = async (query, filter = {}) => {
    try {
      let limit = +query.limit || 10;
      let page = +query.page || 1;

      let skip = (page - 1) * limit;

      let allData = await BrandModel.find(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      let count = await BrandModel.countDocuments(filter);

      return {
        data: allData,
        pagination: {
          page: page,
          limit: limit,
          total: count,
        },
      };
    } catch (exception) {
      throw exception;
    }
  };

  getSingleRowByFilter = async (filter) => {
    try {
      let detail = await BrandModel.findOne(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"]);
      return detail;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleDataByFilter = async (filter, data) => {
    try {
      const update = await BrandModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true }
      );
      return update;
    } catch (exception) {
      throw exception;
    }
  };

  deleteSingleRowByFilter = async(filter) => {
    try {
      const data = await BrandModel.findOneAndDelete(filter)
      return data;
    } catch(exception) {
      throw exception
    }
  }
}

const brandSvc = new BrandService()
module.exports = brandSvc