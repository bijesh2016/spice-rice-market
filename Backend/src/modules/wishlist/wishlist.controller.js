class wishlistController{

    createWishlist=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"WishList Created Successfully",
                status:"WISHLIST CREATED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception);
        }
    }

    updateWishlist=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"WishList Updated Successfully",
                status:"WISHLIST UPDATED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception);
        }
    }

    deleteWishlist=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"WishList Deleted Successfully",
                status:"WISHLIST DELETED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception);
        }
    }
}

const wishlistCtrl=new wishlistController();
module.exports = wishlistCtrl;