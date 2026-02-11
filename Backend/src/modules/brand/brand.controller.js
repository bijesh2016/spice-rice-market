const { Status } = require("../../config/constant");
const brandSvc = require("./brand.service");
const productSvc = require('../product/product.service')

class BrandController {
  #brandDetail;
  brandStore =async (req, res, next) => {
    try {
      const payload = await brandSvc.transformCreatePayload(req);
      const brand = await brandSvc.createBrand(payload)
      res.json({
        data: brand, 
        message: "Brand created successfully",
        status: "SUCCESS",
        options: null
      })
    } catch (exception) {
      next(exception)
    } 
  };

  listAllBrands = async (req, res, next) => {
    try {
      let filter = {};
      if(req.query['search']) {
        filter = {
          name: new RegExp(req.query.search, 'i'),
        };
      }
      let {data, pagination} = await brandSvc.getAllList(req.query, filter);
      res.json({
        data: data, 
        message: "Brand List",
        status: "SUCCESS",
        options: {
          pagination
        }
      })    
    } catch(exception) {
      next(exception)
    }
  };

  #validateBrandById = async(id) => {
    this.#brandDetail = await brandSvc.getSingleRowByFilter({
      _id: id
    })
    if (!this.#brandDetail) {
      throw {
        code: 422,
        message: "Brand does not exists",
        status: "NOT_FOUND",
      };
    }
  }

  brandDetailById = async (req, res, next) => {
    try {
      await this.#validateBrandById(req.params.id)
      res.json({
        data: this.#brandDetail,
        message: "Brand detail",
        status:"SUCCESS",
        options: null
      })
    } catch(exception) {
      next(exception)
    }
  };

    brandsForHome = async (req, res, next) => {
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
            let { data, pagination } = await brandSvc.getAllList(req.query, filter);
            res.json({
                data: data,
                message: "Brand List",
                status: "SUCCESS",
                options: {
                    pagination,
                },
            });
        } catch (exception) {
            next(exception);
        }
    };

    productsByBrandSlug = async (req, res, next) => {
        try {
            this.#brandDetail = await brandSvc.getSingleRowByFilter({
                slug: req.params.slug,
                status: Status.ACTIVE
            })
            if(!this.#brandDetail) {
                throw {
                    code: 422,
                    message: "Brand not found",
                    status: "NOT_FOUND"
                }
            }

            let {data, pagination} = await productSvc.getAllList(req.query, {
                brand: this.#brandDetail._id,
                status: Status.ACTIVE
            })

            res.json({
                data: {
                    detail: this.#brandDetail,
                    product: data
                },
                message: "Product detail",
                status: "PRODUCT_DETAIL_SUCCESS",
                options: {pagination}
            })
        } catch(exception) {
            next(exception)
        }
    };

  brandUpdateById = async (req, res, next) => {
    try {
      await this.#validateBrandById(req.params.id);
      let payload = await brandSvc.transformUpdatePayload(req, this.#brandDetail);
      const updateData = await brandSvc.updateSingleDataByFilter({
        _id: this.#brandDetail._id
      }, payload)
      res.json({
        data: updateData,
        message: "Brand Updated",
        status: "SUCCESS",
        options: null
      })
    } catch(exception) {
      next(exception)
    }
  };

  brandDeleteById = async (req, res, next) => {
    try {
      await this.#validateBrandById(req.params.id);

      const del = await brandSvc.deleteSingleRowByFilter({
        _id: this.#brandDetail._id
      })

      res.json({
        data:del,
        message: "Banner deleted successfully",
        status: "SUCCESS",
        options: null
      })
    } catch(exception) {
      next(exception)
    }
  };
}

const brandCtrl = new BrandController()
module.exports = brandCtrl