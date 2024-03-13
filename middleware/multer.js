import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";
dotenv.config()
const url = process.env.MONGO_URI

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      }
    } else {
      //Otherwise save to default bucket
      return `${Date.now()}_${file.originalname}`
    }
  },
})

// Set multer storage engine to the newly created object
const upload = multer({ storage })


export {
    upload,
}



