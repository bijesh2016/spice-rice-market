const productRouter = require("express").Router()
const productCtrl = require("./product.controller");
const loginCheck = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const {bodyValidator} = require("../../middleware/request-validator.middleware")
const { UserRoles } = require("../../config/constants");
const { ProductDTO } = require("./product.validator");
// update
// delete
productRouter.get('/for-home', productCtrl.productsForHome)   // productList for home page
productRouter.get('/:slug/product', productCtrl.productsByProductSlug)   // Products by product Slug
productRouter.get("/for-home/featured", productCtrl.featuredProducts)

// /product
productRouter.post('/', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().array('images'), bodyValidator(ProductDTO), productCtrl.productStore)   // create a product
productRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.listAllProducts);   // list all products

productRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.productDetailById);   // detail by Id
productRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().array('images'), bodyValidator(ProductDTO),  productCtrl.productUpdateById);      // update a product
productRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.productDeleteById);      // update a product
module.exports = productRouter