const categoryRouter = require("express").Router();
const categoryCtrl = require("./category.controller");
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/file-upload.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const { UserRoles } = require("../../config/constant");
const { createCategorySchema } = require("./category.validator");

categoryRouter.get("/for-home", categoryCtrl.categoriesForHome);
categoryRouter.get("/:slug/products", categoryCtrl.productsByCategorySlug);

categoryRouter.post(
  "/",
  loginCheck([UserRoles.ADMIN, UserRoles.SELLER]),
  uploader().single("image"),
  bodyValidator(createCategorySchema),
  categoryCtrl.categoryStore
);
categoryRouter.get("/", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.listAllCategories);
categoryRouter.get("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.categoryDetailById);
categoryRouter.put(
  "/:id",
  loginCheck([UserRoles.ADMIN, UserRoles.SELLER]),
  uploader().single("image"),
  bodyValidator(createCategorySchema),
  categoryCtrl.categoryUpdateById
);
categoryRouter.delete("/:id", loginCheck([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.categoryDeleteById);

module.exports = categoryRouter;
