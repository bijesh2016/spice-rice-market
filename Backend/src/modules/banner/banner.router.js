const bannerRouter=require("express").Router();
const bannerCtrl=require("./banner.controller");
const uploader=require("../../middlewares/file-upload.middleware");

bannerRouter.get("/for-home",bannerCtrl.getBannerForHome);
bannerRouter.get("/",bannerCtrl.getBannerForAll);
bannerRouter.get("/:id",bannerCtrl.bannerDetailById);

bannerRouter.post("/",uploader('image').single('image'),bannerCtrl.createBanner);
bannerRouter.put("/:id",bannerCtrl.updateBanner);
bannerRouter.delete("/:id",bannerCtrl.deleteBanner);

module.exports=bannerRouter;