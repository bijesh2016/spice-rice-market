const { Status } = require("../../config/constant");
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
            min: 10000
        },
        discount: {
            type: Number,
            min: 0,
            max: 80,
            default: 0
        },
        afterDiscount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
        },
        category: [{
            type: mongoose.Types.ObjectId,
            ref: "Category",
            // required: true,
            default: null
        }],
        brand: {
            type: mongoose.Types.ObjectId,
            ref: "Brand",
            default: null
        },
        featured: {
            type: Boolean,
            default: false
        },
        seller: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        attributes: [{
            name: String,
            value: [String]
        }],
        images: [{
            url: String,
            optimizedUrl: String,
        }],
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.INACTIVE,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            default: null,
        },
        updatedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    }
);
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;