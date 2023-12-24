import { Router } from "express";
import registerUser from '../controllers/users/registerUser.js'
import {upload} from '../middlewares/multer.middleware.js'
import loginUser from "../controllers/users/loginUser.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import logoutUser from "../controllers/users/logoutUser.js";
import refreshAccessToken from "../controllers/users/refreshAccessToken.js";
import updateUserAvatar from "../controllers/users/updateUserAvatar.js";
import updateUserCoverImage from "../controllers/users/updateUserCoverImage.js";
import updateAccountDetails from "../controllers/users/updateAccountDetails.js";
import changeCurrentPassword from "../controllers/users/changeCurrentPassword.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/update-avatar").put(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route('/update-cover-image').put(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route('/update-account').put(verifyJWT,updateAccountDetails)
router.route('/update-password').put(verifyJWT,changeCurrentPassword)

export default router;