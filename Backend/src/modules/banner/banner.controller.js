const bannerSvc = require("./banner.service");
const { Status } = require("../../config/constant");

class BannerController {
  #bannerDetail;

  #validateBanner = async (id) => {
    this.#bannerDetail = await bannerSvc.getSingleRowByFilter({ _id: id });

    if (!this.#bannerDetail) {
      throw {
        code: 404,
        message: "Banner not found",
        status: "NOT_FOUND",
      };
    }
  };

  createBanner = async (req, res, next) => {
    try {
      const payload = await bannerSvc.transformCreatePayload(req);
      const banner = await bannerSvc.createBanner(payload);

      res.json({
        data: banner,
        message: "Banner created successfully",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBannerForHome = async (req, res, next) => {
    try {
      const filter = { isActive: true };

      if (req.query.search) {
        filter.title = new RegExp(req.query.search, "i");
      }

      const { data, pagination } = await bannerSvc.getAllList(req.query, filter);
      res.json({
        data,
        message: "Banner list",
        status: "SUCCESS",
        options: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBannerForAll = async (req, res, next) => {
    try {
      const filter = {};

      if (req.query.search) {
        filter.title = new RegExp(req.query.search, "i");
      }

      const { data, pagination } = await bannerSvc.getAllList(req.query, filter);
      res.json({
        data,
        message: "Banner list",
        status: "SUCCESS",
        options: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  bannerDetailById = async (req, res, next) => {
    try {
      await this.#validateBanner(req.params.id);
      res.json({
        data: this.#bannerDetail,
        message: "Banner detail",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBanner = async (req, res, next) => {
    try {
      await this.#validateBanner(req.params.id);
      const payload = await bannerSvc.transformUpdatePayload(req, this.#bannerDetail);
      const updateData = await bannerSvc.updateSingleDataByFilter(
        { _id: this.#bannerDetail._id },
        payload
      );

      res.json({
        data: updateData,
        message: "Banner updated successfully",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBanner = async (req, res, next) => {
    try {
      await this.#validateBanner(req.params.id);
      const deleted = await bannerSvc.deleteSingleRowByFilter({
        _id: this.#bannerDetail._id,
      });

      res.json({
        data: deleted,
        message: "Banner deleted successfully",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new BannerController();
