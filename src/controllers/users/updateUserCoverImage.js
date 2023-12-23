import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary";

const updateUserCoverImage = asyncHandler(async(req,res)=>{
    const coverImageLocalPath = req.file?.path;

    if(!coverImageLocalPath){
        throw new ApiError(400,"File is missing");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!coverImage){
        throw new ApiError(400,"Error while uploading cover image on cloudinary");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true,
        }
    ).select("-password")    

    return res.status(200).json(new ApiResponse(200,user,"Cover image updated successfully"))
})

export default updateUserCoverImage