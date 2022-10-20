import multer from "multer";

export const storage = multer.diskStorage({
  destination: function(req, file, cd){
    cd(null, "image")
  },
  filename: function(req, file, cd){
    cd(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`)
  }
})