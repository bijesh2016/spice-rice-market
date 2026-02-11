const bannerSvc = require('./banner.service');
const {Status}=require('../../config/constant');

class bannerController {
    #bannerDetail;
    createBanner = async (req, res, next) => {
        try {
            const payload = await bannerSvc.transformCreatePayload(req)
            const banner = await bannerSvc.createBanner(payload)
            res.json({
                data: {},
                message: "Banner Created",
                status: "BANNER_CREATED_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    getBannerForHome = async (req, res, next) => {
        try {
            let filter={
                status: Status.ACTIVE
            }
            if(req.query["search"]){
                filter={
                    ...filter,
                    name: new RegExp(req.query.search, "i")
                }
            }
            let {data,pagination}=await bannerSvc.getAllList(req.query, filter);
            res.json({
                data: {},
                message: "Banner GetBannerForHome",
                status: "BANNER_GET_BANNER_SUCCESSFULLY",
                options: pagination
            })
        } catch (exception) {
            next(exception)
        }
    }

    #validateBanner = async (id) => {
        this.#bannerDetail = await bannerSvc.getSingleRowByFilter({
            _id: id
        })
        if (!this.#bannerDetail) {
            throw {
                code: 403,
                message: "Banner Not Found",
                status: "NOT_FOUND"
            }
        }
    }


    getBannerForAll = async (req, res, next) => {
        try {
            let filter = {};
            if (req.query['search']) {
                filter = {
                    name: new RegExp(req.query['search'], 'i'),
                };
            }
            let {data, pagination} = await bannerSvc.getAllList(req.query, filter);
            res.json({
                data: {},
                message: "Banner GetBannerForAll",
                status: "BANNER_GET_BANNER_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    updateBanner = async (req, res, next) => {
        try {
            await this.#bannerDetail.updateBanner(req.params.id, req.body)
            let payload = await bannerSvc.transformUpdatePayload(req,this.#bannerDetail)
            const updateData=await bannerSvc.updateSingleDataByFilter({
                _id: this.#bannerDetail._id,
            },payload)
            res.json({
                data: updateData,
                message: "Banner Updated",
                status: "BANNER_UPDATE_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    bannerDetailById =async (req, res, next) => {
        try{
            await this.#bannerDetail.findById(req.params.id)
            res.json({
                data:this.#bannerDetail,
                message: "Banner Detail Found",
                status: "BANNER_DETAIL_SUCCESSFULLY",
                options: null
            })
        }catch (exception) {
            next(exception)
        }
    }


    deleteBanner = async (req, res, next) => {
        try {
            await this.#validateBanner(req.params.id)
            const del=await bannerSvc.deleteSingleRowByFilter({
                _id: this.#bannerDetail._id,
            })
            res.json({
                data: {},
                message: "Banner Deleted",
                status: "BANNER_DELETED_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const bannerCtrl = new bannerController();
module.exports = bannerCtrl;
