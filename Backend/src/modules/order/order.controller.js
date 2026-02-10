class orderController {
    createOrder=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Order Created Successfully",
                status:"ORDER CREATED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception)
        }
    }

    getAllOrders=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Order GetAll Successfully",
                status:"ORDER GET ALL SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception)
        }
    }

    getOrderById=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Order GetById Successfully",
                status:"ORDER GET BY ID SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception)
        }
    }

    updateOrder=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Order Updated Successfully",
                status:"ORDER UPDATED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception)
        }
    }

    deleteOrder=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Order Deleted Successfully",
                status:"ORDER DELETED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception)
        }
    }
}

const orderCtrl=new orderController();
module.exports = orderCtrl