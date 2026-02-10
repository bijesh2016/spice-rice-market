const { Status } = require("../../config/constants");
const categorySvc = require("./category.service");
const productSvc = require("../product/product.service")

class CategoryController {
  #categoryDetail;

  categoryStore =async (req, res, next) => {
    try {
      const payload = await categorySvc.transformCreatePayload(req);
      const category = await categorySvc.createCategory(payload)
      res.json({
        data: category, 
        message: "Category created successfully",
        status: "SUCCESS",
        options: null
      })
    } catch (exception) {
      next(exception)
    } 
  };

  listAllCategories = async (req, res, next) => {
    try {
      let filter = {};
      if(req.query['search']) {
        filter = {
          name: new RegExp(req.query.search, 'i'),
        };
      }
      let {data, pagination} = await categorySvc.getAllList(req.query, filter);
      res.json({
        data: data, 
        message: "Category List",
        status: "SUCCESS",
        options: {
          pagination
        }
      })    
    } catch(exception) {
      next(exception)
    }
  };

  #validateCategoryById = async(id) => {
    this.#categoryDetail = await categorySvc.getSingleRowByFilter({
      _id: id
    })
    if (!this.#categoryDetail) {
      throw {
        code: 422,
        message: "Category does not exists",
        status: "NOT_FOUND",
      };
    }
  }

  categoryDetailById = async (req, res, next) => {
    try {
      await this.#validateCategoryById(req.params.id)
      res.json({
        data: this.#categoryDetail,
        message: "Category detail",
        status:"SUCCESS",
        options: null
      })
    } catch(exception) {
      next(exception)
    }
  };

  categoryUpdateById = async (req, res, next) => {
    try {
      await this.#validateCategoryById(req.params.id);
      // payload
      let payload = await categorySvc.transformUpdatePayload(req, this.#categoryDetail);
      const updateData = await categorySvc.updateSingleDataByFilter({
        _id: this.#categoryDetail._id
      }, payload)
      res.json({
        data: updateData,
        message: "Category Updated",
        status: "SUCCESS",
        options: null
      })
    } catch(exception) {
      next(exception)
    }
  };

  categoryDeleteById = async (req, res, next) => {
    try {
      await this.#validateCategoryById(req.params.id);

      const del = await categorySvc.deleteSingleRowByFilter({
        _id: this.#categoryDetail._id
      })

      res.json({
        data:del,
        message: "Category deleted successfully",
        status: "SUCCESS",
        options: null
      })


    } catch(exception) {
      next(exception)
    }
  };

  // open api
  categoriesForHome = async (req, res, next) => {
    try {
      let filter = {
        status: Status.ACTIVE
      };
      if (req.query["search"]) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i"),
        };
      }
      let { data, pagination } = await categorySvc.getAllList(req.query, filter);
      res.json({
        data: data,
        message: "Category List",
        status: "SUCCESS",
        options: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  productsByCategorySlug = async (req, res, next) => {
    try {
      this.#categoryDetail = await categorySvc.getSingleRowByFilter({
        slug: req.params.slug,
        status: Status.ACTIVE
      });
      if (!this.#categoryDetail) {
        throw {
          code: 422,
          message: "Category not found",
          status: "NOT_FOUND",
        };
      }


      let { data, pagination } = await productSvc.getAllList(req.query, {
        category: this.#categoryDetail._id,
        status: Status.ACTIVE,
      });

      res.json({
        data: {
          detail: this.#categoryDetail,
          product: data,
        },
        message: "Category detail",
        status: "CATEGORY_DETAIL_SUCCESS",
        options: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const categoryCtrl = new CategoryController()
module.exports = categoryCtrl