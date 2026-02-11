const multer = require('multer');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let fileType = 'other';
        if (file.mimetype.startsWith('image/')) {
            fileType = 'images';
        } else if (file.mimetype.startsWith('video/')) {
            fileType = 'videos';
        }

        const uploadPath = path.join(UPLOAD_DIR, fileType);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp',"image/bmp","image/svg","image/tiff","image/iff"];
    const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-ms-video', 'video/x-ms-wmv', 'video/x-matroska'];

    // Allow image fields: image, images, banner, logo, profileImage, profilePicture, thumbnail, avatar
    const imageFieldNames = ['image', 'images', 'banner', 'logo', 'profileImage', 'profilePicture', 'thumbnail', 'avatar','logo'];

    // Allow image fields with image MIME types
    if (imageFieldNames.includes(file.fieldname) && allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === 'videos' && allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error(`Invalid file type for ${file.fieldname}. Only images or videos are allowed.`);
        error.status = 400;
        cb(error, false);
    }
};

const uploader = () => {
    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 30 * 1024 * 1024,
            files: 5
        }
    });
};

module.exports = uploader;