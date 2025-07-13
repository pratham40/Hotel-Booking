import multer from "multer";

const upload = multer({
    dest: 'uploads/',
    storage: multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
})

export default upload;