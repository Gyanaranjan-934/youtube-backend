import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";

const updateUserCoverImage = asyncHandler(async(req,res)=>{
    const coverImageLocalPath = req.file?.path;

    if(!coverImageLocalPath){
        throw new ApiError(400,"File is missing");
    }

    // delete the old cover image in cloudinary
    const userData = await User.findOne(req?.user._id);

    const oldCoverImage = await deleteOnCloudinary(userData?.coverImage);

    if(!oldCoverImage){
        throw new ApiError(400,"Failed to delete old cover image");
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