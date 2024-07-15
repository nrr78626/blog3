// import cloudinary from "cloudinary"
import { v2 as cloudinary } from "cloudinary"
import Cloudinary_API from "./Cloudinary/Cloudinary_API";

const UploadImage = async (file: File, folder: string) => {
    try {
        const buffer = await file.arrayBuffer();
        const bytes = Buffer.from(buffer)
        return new Promise(async (resolve, reject) => {
            Cloudinary_API()
            await cloudinary.uploader.upload_stream({
                resource_type: "auto",
                folder: folder,
            }, async (err, result) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve(result)
            }).end(bytes)
        })
    } catch (error) {
        console.log(error)
    }
}

export default UploadImage