import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields must be provided");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            fullName: fullName,
            email
        },
        {
            new: true
        }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200,user,"Account details updated successfully"));
})

export default updateAccountDetails