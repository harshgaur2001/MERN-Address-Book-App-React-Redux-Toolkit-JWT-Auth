import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";

const addAddress = asyncHandler(async (req, res) => {
  const { name, contact_email, contact, address } = req.body;

  if (!name || !contact_email || !contact || !address) {
    throw new ApiError(400, "All address fields are required");
  }

  const user = await User.findById(req.user._id);

  user.addresses.push({ name, contact_email, contact, address });

  await user.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        user.addresses[user.addresses.length - 1],
        "Address added successfully",
      ),
    );
});

const getAllAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, user.addresses, "Addresses fetched"));
});

const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { name, contact_email, contact, address } = req.body;

  const user = await User.findById(req.user._id);

  const addressObj = user.addresses.id(addressId);

  if (!addressObj) {
    throw new ApiError(404, "Address not found");
  }

  if (name) addressObj.name = name;
  if (contact_email) addressObj.contact_email = contact_email;
  if (contact) addressObj.contact = contact;
  if (address) addressObj.address = address;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, addressObj, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  const addressObj = user.addresses.id(addressId);

  if (!addressObj) {
    throw new ApiError(404, "Address not found");
  }

  addressObj.deleteOne();

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Address deleted successfully"));
});

export { addAddress, getAllAddresses, updateAddress, deleteAddress };
