import express from "express"

const router = express.Router();

import {
  registerUser,
  loginUser,
  buinessProfile,
  getAllBusinessProfile,
  businessCoreInformation

} from "../controllers/authController";

// import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/user-profile").post(buinessProfile).get(getAllBusinessProfile )

router.route("/business-core-info").post(businessCoreInformation)


//Admin Routes

// router
//   .route("/admin/users")
//   .get(allUsers);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserByAdmin)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByAdmin);


export default router;