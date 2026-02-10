class bannerController {
    createBanner=async(req,res,next)=> {
        try {
            res.json({
                data:{},
                message: "Banner Created",
                status: "BANNER_CREATED_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    getBannerForHome=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message:"Banner GetBannerForHome",
                status: "BANNER_GET_BANNER_SUCCESSFULLY",
                options: null
            })
        }catch(exception){
            next(exception)
        }
    }

    getBannerForAll=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Banner GetBannerForAll",
                status: "BANNER_GET_BANNER_SUCCESSFULLY",
                options: null
            })
        }catch(exception){
            next(exception)
        }
    }

    updateBanner=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message: "Banner Updated",
                status: "BANNER_UPDATE_SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }

    deleteBanner=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message: "Banner Deleted",
                status: "BANNER_DELETED_SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const bannerCtrl=new bannerController();
module.exports=bannerCtrl;
