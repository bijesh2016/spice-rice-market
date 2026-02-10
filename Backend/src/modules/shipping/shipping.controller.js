class shippingController {
     createShipping=async(req,res,next)=>{
         try{
             res.json({
                 data:{},
                 message:"Shipping created successfully",
                 status:"SHIPPING CREATED SUCCESSFULLY",
                 option:null
             })
         }catch(exception){
             next(exception)
         }
     }
     updateShipping=async(req,res,next)=>{
         try{
             res.json({
                 data:{},
                 message:"Shipping updated successfully",
                 status:"SHIPPING UPDATED SUCCESSFULLY",
                 option:null
             })
         }catch(exception){
             next(exception)
         }
     }
     deleteShipping=async(req,res,next)=>{
         try{
             res.json({
                 data:{},
                 message:"Shipping deleted successfully",
                 status:"SHIPPING DELETED SUCCESSFULLY",
                 option:null
             })
         }catch(exception){
             next(exception)
         }
     }
}

const shippingCtrl=new shippingController();
module.exports=shipingCtrl