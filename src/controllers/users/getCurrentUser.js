import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const getCurrentUser = asyncHandler(async(req, res)=>{
    return res.status(200).json(new ApiResponse(200,{},"current user fetched successfully"));
})

export default getCurrentUser