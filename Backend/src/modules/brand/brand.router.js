const brandRouter = require("express").Router()
const brandCtrl = require("./brand.controller");
// const loginCheck = require("../../middleware/auth.middleware");
const uploader = require("../../middlewares/file-upload.middleware")
// const {bodyValidator} = require("../../middleware/request-validator.middleware")
const { UserRoles } = require("../../config/constant");
const { BrandDTO } = require("./brand.validator");
brandRouter.get('/for-home', brandCtrl.brandsForHome)  
brandRouter.get('/:slug/products', brandCtrl.productsByBrandSlug)   

brandRouter.post('/', uploader().single('image'), brandCtrl.brandStore)
brandRouter.get("/",  brandCtrl.listAllBrands);
brandRouter.get("/:id", brandCtrl.brandDetailById);
brandRouter.put("/:id", uploader().single('image'), brandCtrl.brandUpdateById);
brandRouter.delete("/:id",  brandCtrl.brandDeleteById);
module.exports = brandRouter

