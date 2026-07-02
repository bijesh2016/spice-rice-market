const cloudinaryService=require("./cloudinary.service");
class FileUploadService{
    uploadSvc;
    constructor(cloudinarySvc){
        this.uploadSvc=cloudinarySvc
    }
    async uploadFile(filepath,dir='/'){
        try{
            return await this.uploadSvc.fileupload(filepath,dir);
        }catch(exception){
            throw exception
        }
    }

    async fileupload(filepath, dir = '/') {
        return this.uploadFile(filepath, dir);
    }
}

const fileUploadSvc = new FileUploadService(
    new cloudinaryService()
);
module.exports = fileUploadSvc;
