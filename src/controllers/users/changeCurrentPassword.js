import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from '../../utils/ApiError.js'
import { ApiResponse } from "../../utils/ApiResponse.js";


const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordsCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordsCorrect){
        throw new ApiError(400,"Invalid old password");
    }

    user.password = newPassword;

    await user.save({validateBeforeSave: true});

    return res.status(200).json(new ApiResponse(200,{},"Your password has been updated successfully"));
})

export default changeCurrentPassword