const fileUploadSvc = require("../../services/file-upload.service");
const slugify = require("slugify");
const CategoryModel = require("./category.model");

class CategoryService {
  transformCreatePayload = async (req) => {
    try {
      let data = req.body;
      data.slug = slugify(data.name.replace("'", "").replace('"', ""), {
        lower: true,
      });
      if (req.file) {
        data.image = await fileUploadSvc.fileupload(req.file.path, "category/");
      }

      // parentId: 'null' ,'' => null
      if(!data.parentId || data.parentId === 'null') {
        data.parentId = null
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
        data.image = await fileUploadSvc.fileupload(req.file.path, "category/");
      } else {
        data.image = oldData.image;
      }

      // parentId: 'null' ,'' => null
      if (!data.parentId || data.parentId === "null") {
        data.parentId = null;
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  createCategory = async (payload) => {
    try {
      const category = new CategoryModel(payload);
      return await category.save();
    } catch (exception) {
      throw exception;
    }
  };

  getAllList = async (query, filter = {}) => {
    try {
      let limit = +query.limit || 10;
      let page = +query.page || 1;

      let skip = (page - 1) * limit;

      let allData = await CategoryModel.find(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"])
        .populate('parentId', ['_id',"name", "slug","image", "status"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      let count = await CategoryModel.countDocuments(filter);

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
      let detail = await CategoryModel.findOne(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"])
        .populate('parentId', ['_id',"name", "slug","image", "status"]);
      return detail;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleDataByFilter = async (filter, data) => {
    try {
      const update = await CategoryModel.findOneAndUpdate(
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
      const data = await CategoryModel.findOneAndDelete(filter)
      return data;
    } catch(exception) {
      throw exception
    }
  }
}

const categorySvc = new CategoryService()
module.exports = categorySvc