class InventoryController {
    createInventory=async(req,res,next)=>{
        try{
            const
            res.json({
                data:{},
                message:"Inventory created successfully",
                Status:"INVENTORY CREATED SUCCESSFULLY",
                option: null
            })
        }catch(exception){
            next(exception);
        }
    }

    getAllInventory=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Getting all Inventories",
                status:"GET ALL INVENTORY SUCCESSFULLY ",
                option: null
            })
        }catch(exception){
            next(exception);
        }
    }

    getInventoryById=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Getting Inventory with ID",
                status:"GET ALL INVENTORY BY ID",
                option: null
            })
        }catch(exception){
            next(exception);
        }
    }

    updateInventory=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Inventory updated successfully",
                status:"INVENTORY UPDATED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception);
        }
    }

    deleteInventory=async(req,res,next)=>{
        try{
            res.json({
                data:{},
                message:"Inventory deleted successfully",
                status:"INVENTORY DELETED SUCCESSFULLY",
                option:null
            })
        }catch(exception){
            next(exception);
        }
    }
}

const InventoryCtrl=new InventoryController();
module.exports = InventoryCtrl;