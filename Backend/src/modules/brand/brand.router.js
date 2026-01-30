const brandRouter = require("express").Router()
const brandCtrl = require("./brand.controller");
const loginCheck = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const {bodyValidator} = require("../../middleware/request-validator.middleware")
const { UserRoles } = require("../../config/constants");
const { BrandDTO } = require("./brand.validator");
brandRouter.get('/for-home', brandCtrl.brandsForHome)  
brandRouter.get('/:slug/products', brandCtrl.productsByBrandSlug)   

brandRouter.post('/', loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(BrandDTO), brandCtrl.brandStore)  
brandRouter.get("/", loginCheck([UserRoles.ADMIN]), brandCtrl.listAllBrands);   
brandRouter.get("/:id", loginCheck([UserRoles.ADMIN]), brandCtrl.brandDetailById);   
brandRouter.put("/:id", loginCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(BrandDTO),  brandCtrl.brandUpdateById);     
brandRouter.delete("/:id", loginCheck([UserRoles.ADMIN]), brandCtrl.brandDeleteById);    
module.exports = brandRouter