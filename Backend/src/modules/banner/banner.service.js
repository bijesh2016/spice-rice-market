class bannerService {
  transformCreatePayload=async (req) => {
    try {
        let data = req.body;
        data.slug = slugify(data.name.replace("'", "").replace('"', ""), {
          lower: true,
        });
        if (req.file) {
          data.image = await fileUploadSvc.fileupload(req.file.path, "banner/");
        }

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  transformUpdatePayload=async (req) => {
    try {
        let data = req.body;
        data.updatedBy = req.loggedInUser._id;
            if (req.file) {
            data.image = await fileUploadSvc.fileupload(req.file.path, "banner/");
        } else {
          let oldData = await BannerModel.findOne({
            _id: req.params.id,
          });
          data.image = oldData.image;
        }
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  createBanner = async (req) => {
    try {
      const transformedPayload = await this.transformCreatePayload(req);
      const banner = new BannerModel(transformedPayload);
      return await banner.save();
    } catch (exception) {
      throw exception;
    }
  };

  getAllList = async (query, filter = {}) => {
    try {
      let limit = +query.limit || 10;
      let page = +query.page || 1;
      let skip = (page - 1) * limit;
      let allData = await BannerModel.find(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      let count = await BannerModel.countDocuments(filter);
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
      let detail = await BannerModel.findOne(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"]);
      return detail;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleDataByFilter = async (filter, data) => {
    try {
      let oldData = await BannerModel.findOne(filter);
      if (!oldData) {
        throw {
          code: 422,
          message: "Banner does not exists",
          status: "NOT_FOUND",
        };
      }
      if (data.image) {
        data.image = {
          url: data.image,
          optimizedUrl: data.image,
        };
      }
      const update = await BannerModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return update;
    } catch (exception) {
      throw exception;
    }
  };

  deleteSingleRowByFilter = async (filter) => {
    try {
      const data = await BannerModel.findOneAndDelete(filter);
      return data;
    } catch (exception) {
      throw exception;
    }
  };
}

const bannerSvc = new bannerService();
module.exports = bannerSvc;
