const bannerRouter=require("express").Router();
const bannerCtrl=require("./banner.controller");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader=require("../../middlewares/file-upload.middleware");
const { UserRoles } = require("../../config/constant");

bannerRouter.get("/for-home",bannerCtrl.getBannerForHome);
bannerRouter.get("/",bannerCtrl.getBannerForAll);
bannerRouter.get("/:id",bannerCtrl.bannerDetailById);

bannerRouter.post("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bannerCtrl.createBanner);
bannerRouter.put("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bannerCtrl.updateBanner);
bannerRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), bannerCtrl.deleteBanner);

module.exports=bannerRouter;
