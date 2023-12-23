import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary";

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"File is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(400,"Error while uploading avatar on cloudinary");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true,
        }
    ).select("-password")    

    return res.status(200).json(new ApiResponse(200,user,"Avatar image updated successfully"))
})

export default updateUserAvatar