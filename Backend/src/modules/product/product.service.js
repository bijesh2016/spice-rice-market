const fileUploadSvc = require("../../services/file-upload.service");
const slugify = require("slugify");
const ProductModel = require("./product.model");
const { randomStringGenerator } = require("../../utils/helpers");

class ProductService {
    transformCreatePayload = async (req) => {
        try {
            let data = req.body;
            data.slug = slugify(
                data.name.replace("'", "").replace('"', "")+"-"+randomStringGenerator(5)
                , {
                    lower: true,
                });

            data.price = data.price * 100;  // conversion in pais
            // price - price * discount%
            data.afterDiscount = data.price - data.price * data.discount /100


            // category, brand,
            if(data.category=== 'null' || data.category === '') {
                data.category = null
            }

            if (data.brand === "null" || data.brand === "") {
                data.brand = null;
            }

            // loggedinUser => seller
            data.seller= req.loggedInUser._id;

            if (req.files) {
                let images = [];
                req.files.map((image) => {
                    let upload = fileUploadSvc.fileupload(image.path, "product/");  // promise
                    images.push(upload) // [promises]
                })

                let uploadedImages = await Promise.allSettled(images) // resolve => status => rejected
                // console.log({uploadedImages});
                data.images = [];
                uploadedImages.forEach((val) => {
                    // console.log({val})
                    if(val.status !== 'rejected') {
                        data.images.push(val.value);
                    }
                })
            } else {
                data.images = null
            }

            // console.log({"images: ": data.images})

            data.createdBy = req.loggedInUser._id;
            return data;
        } catch (exception) {
            throw exception;
        }
    };

    transformUpdatePayload = async (req, oldData) => {
        try {
            let data = req.body;
            data.price = data.price * 100; // conversion in pais
            // price - price * discount%
            data.afterDiscount = data.price - (data.price * data.discount) / 100;

            // category, brand,
            if (data.category === "null" || data.category === "") {
                data.category = null;
            }

            if (data.brand === "null" || data.brand === "") {
                data.brand = null;
            }

            if (req.files) {
                let images = [];
                req.files.map((image) => {
                    let upload = fileUploadSvc.fileupload(image.path, "product/"); // promise
                    images.push(upload); // [promises]
                });
                let uploadedImages = await Promise.allSettled(images); // resolve => status => rejected

                data.images = [];

                uploadedImages.forEach((val) => {
                    if (val.status !== "rejected") {
                        data.images.push(val.value);
                    }
                });
                data.images =[
                    ...oldData.images,
                    ...data.images
                ]
            } else {
                data.images = oldData.images;
            }

            data.updatedBy = req.loggedInUser._id;
            return data;
        } catch (exception) {
            throw exception;
        }
    };

    createProduct = async (payload) => {
        try {
            const product = new ProductModel(payload);
            return await product.save();
        } catch (exception) {
            throw exception;
        }
    };

    getAllList = async (query, filter = {}) => {
        try {
            let limit = +query.limit || 10;
            let page = +query.page || 1;

            let skip = (page - 1) * limit;

            let allData = await ProductModel.find(filter)
                .populate("createdBy", ["_id", "name", "email", "role", "image"])
                .populate("updatedBy", ["_id", "name", "email", "role", "image"])
                .populate("seller", ["_id",'name','email','role','image'])
                .populate("category", ["_id",'name','slug','status','image'])
                .populate("brand", ['_id','name','slug','status','image'])
                .sort({ createdAt: "desc" })
                .skip(skip)
                .limit(limit);
            let count = await ProductModel.countDocuments(filter);

            return {
                data: allData,
                pagination: {
                    page: page,
                    limit: limit,
                    total: count,
                },
            };
        } catch (exception) {
            throw exception;
        }
    };

    getSingleRowByFilter = async (filter) => {
        try {
            let detail = await ProductModel.findOne(filter)
                .populate("createdBy", ["_id", "name", "email", "role", "image"])
                .populate("updatedBy", ["_id", "name", "email", "role", "image"])
                .populate("seller", ["_id",'name','email','role','image'])
                .populate("category", ["_id",'name','slug','status','image'])
                .populate("brand", ['_id','name','slug','status','image']);
            return detail;
        } catch (exception) {
            throw exception;
        }
    };

    updateSingleDataByFilter = async (filter, data) => {
        try {
            const update = await ProductModel.findOneAndUpdate(
                filter,
                { $set: data },
                { new: true }
            );
            return update;
        } catch (exception) {
            throw exception;
        }
    };

    deleteSingleRowByFilter = async(filter) => {
        try {
            const data = await ProductModel.findOneAndDelete(filter)
            return data;
        } catch(exception) {
            throw exception
        }
    }
}

const productSvc = new ProductService()
module.exports = productSvc