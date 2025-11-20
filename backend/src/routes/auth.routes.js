import { Router } from "express";
import {
  login,
  registerUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  changeCurrentPassword,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = Router();

// unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/refresh-token").post(refreshAccessToken);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );

// secured Address routes
router.route("/address").post(verifyJWT, addAddress);
router.route("/address").get(verifyJWT, getAllAddresses);
router.route("/address/:addressId").put(verifyJWT, updateAddress);
router.route("/address/:addressId").delete(verifyJWT, deleteAddress);

export default router;
