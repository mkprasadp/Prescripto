import multer from 'multer';

const Stroage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
})

const upload = multer({Stroage});

export default upload