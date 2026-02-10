const { Status, UserRoles } = require("../../config/constant");
const productSvc = require("./product.service");

class ProductController {
    #productDetail;

    productStore = async (req, res, next) => {
        try {
            const payload = await productSvc.transformCreatePayload(req);
            const product = await productSvc.createProduct(payload);
            res.json({
                data: product,
                message: "Product created successfully",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    listAllProducts = async (req, res, next) => {
        try {
            let filter = {};
            if (req.query["search"]) {
                filter = {
                    name: new RegExp(req.query.search, "i"),
                    description: new RegExp(req.query.search, "i"),
                };
            }

            // if loggedin user seller
            if (req.loggedInUser.role === UserRoles.SELLER) {
                filter = {
                    ...filter,
                    seller: req.loggedInUser._id,
                };
            }
            let { data, pagination } = await productSvc.getAllList(req.query, filter);
            res.json({
                data: data,
                message: "Product List",
                status: "SUCCESS",
                options: {
                    pagination,
                },
            });
        } catch (exception) {
            next(exception);
        }
    };

    /** */
    #validateProductById = async (id) => {
        this.#productDetail = await productSvc.getSingleRowByFilter({
            _id: id,
        });
        if (!this.#productDetail) {
            throw {
                code: 422,
                message: "Product does not exists",
                status: "NOT_FOUND",
            };
        }
    };

    #validateMyProduct = (seller, user) => {
        if (
            this.#productDetail.seller !== user._id && // product.seller.equals(user._id)
            user.role !== UserRoles.ADMIN
        ) {
            throw {
                code: 403,
                message: "Not your product!!!!",
                status: "ACCESS_DENIED",
            };
        }
    };

    productDetailById = async (req, res, next) => {
        try {
            await this.#validateProductById(req.params.id);
            this.#validateMyProduct(this.#productDetail.seller._id, req.loggedInUser);
            //
            res.json({
                data: this.#productDetail,
                message: "Product detail",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    productUpdateById = async (req, res, next) => {
        try {
            await this.#validateProductById(req.params.id);
            this.#validateMyProduct(this.#productDetail.seller._id, req.loggedInUser);
            // payload
            let payload = await productSvc.transformUpdatePayload(
                req,
                this.#productDetail
            );
            const updateData = await productSvc.updateSingleDataByFilter(
                {
                    _id: this.#productDetail._id,
                },
                payload
            );
            res.json({
                data: updateData,
                message: "Product Updated",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    productDeleteById = async (req, res, next) => {
        try {
            await this.#validateProductById(req.params.id);
            this.#validateMyProduct(this.#productDetail.seller._id, req.loggedInUser);

            const del = await productSvc.deleteSingleRowByFilter({
                _id: this.#productDetail._id,
            });

            res.json({
                data: del,
                message: "Banner deleted successfully",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    // open api
    productsForHome = async (req, res, next) => {
        try {
            let filter = {
                status: Status.ACTIVE,
            };
            if (req.query["search"]) {
                filter = {
                    ...filter,
                    name: new RegExp(req.query.search, "i"),
                };
            }
            let { data, pagination } = await productSvc.getAllList(req.query, filter);
            res.json({
                data: data,
                message: "Product List",
                status: "SUCCESS",
                options: {
                    pagination,
                },
            });
        } catch (exception) {
            next(exception);
        }
    };

    featuredProducts = async (req, res, next) => {
        try {
            let filter = {
                status: Status.ACTIVE,
                featured: true
            };
            if (req.query["search"]) {
                filter = {
                    ...filter,
                    name: new RegExp(req.query.search, "i"),
                };
            }
            let { data, pagination } = await productSvc.getAllList(req.query, filter);
            res.json({
                data: data,
                message: "Product List",
                status: "SUCCESS",
                options: {
                    pagination,
                },
            });
        } catch (exception) {
            next(exception);
        }
    };

    productsByProductSlug = async (req, res, next) => {
        try {
            this.#productDetail = await productSvc.getSingleRowByFilter({
                slug: req.params.slug,
                status: Status.ACTIVE,
            });
            if (!this.#productDetail) {
                throw {
                    code: 422,
                    message: "Product does not exists",
                    status: "NOT_FOUND",
                };
            }

            // reviews
            // TODO: REVIEW FETCH AND SEND
            let reviews = [];

            let { data } = await productSvc.getAllList(
                { limit: 8 },
                {
                    category: { $in: this.#productDetail.category.map((row) => row._id) },
                    _id: { $ne: this.#productDetail._id },
                }
            );

            res.json({
                data: {
                    detail: this.#productDetail,
                    reviews: reviews,
                    recommended: data,
                },
                message: "Product detail",
                status: "PRODUCT_DETAIL_SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };
}

const productCtrl = new ProductController()
module.exports = productCtrl