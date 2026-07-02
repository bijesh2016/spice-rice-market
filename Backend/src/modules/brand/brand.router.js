const brandRouter = require("express").Router()
const brandCtrl = require("./brand.controller");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/file-upload.middleware")
const {bodyValidator} = require("../../middlewares/validator.middleware")
const { UserRoles } = require("../../config/constant");
const { BrandDTO } = require("./brand.validator");
brandRouter.get('/for-home', brandCtrl.brandsForHome)  
brandRouter.get('/:slug/products', brandCtrl.productsByBrandSlug)   

brandRouter.post('/', loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bodyValidator(BrandDTO), brandCtrl.brandStore)
brandRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.listAllBrands);
brandRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.brandDetailById);
brandRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bodyValidator(BrandDTO), brandCtrl.brandUpdateById);
brandRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.brandDeleteById);
module.exports = brandRouter

