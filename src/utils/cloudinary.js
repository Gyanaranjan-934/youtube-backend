import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    } else {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
      })
      console.log("File uploaded successfully", response.url);
      fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath)
    console.error(error);
    return null;
  }
}

function getPublicIdFromUrl(url) {
  const matches = url.match(/\/v\d+\/([^/]+)\.\w+$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return null;
}

const deleteOnCloudinary = async (filePath) => {
  try {
    const publicId = getPublicIdFromUrl(filePath);
    // Assuming cloudinary is properly configured somewhere in your code.
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    });
    if (response.result === 'ok') {
      console.log("File deleted successfully", response);
      return response;
    } else {
      console.log("File deletion failed. Cloudinary response:", response);
      return null;
    }
  } catch (error) {
    // Handle specific errors or log the general error.
    if (error.http_code === 404) {
      console.log("File not found on Cloudinary");
    } else {
      console.error("Error deleting file on Cloudinary", error);
    }
    return null;
  }
};
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) { console.log(result); });

export {
  uploadOnCloudinary,
  deleteOnCloudinary
}