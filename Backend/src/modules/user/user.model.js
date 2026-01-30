const mongoose = require("mongoose");
const { UserRoles, Status, Gender, StateName } = require("../../config/constants");

const AddressSchema = new mongoose.Schema({
  houseNo: String,
  toleName: String,
  wardNo: Number,
  municipalityName: String,
  district: String,
  state: {
    type: String,
    enum: Object.values(StateName),
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // enum: [UserRoles.ADMIN, UserRoles.SELLER, UserRoles.CUSTOMER]
      enum: Object.values(UserRoles),
      default: UserRoles.CUSTOMER,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    address: {
      billing: AddressSchema,
      shipping: AddressSchema,
    },
    phone: String,
    dob: Date,
    image: {
      url: String,
      optimizedUrl: String,
    },
    // activation
    activationToken: String,
    isEmailVerified: {
      type: Boolean, 
      default: false
    },
    forgetPasswordToken: String, 
    expiryTokenTime: Date,
  },
  {
    timestamps: true, // createdAt, updatedAt
    autoCreate: true, // if the table at the moment of import does not exists, it will auto create it
    autoIndex: true   // If the indexes are missing at the time of import, it will add those 
  }
);

// Model Name => Singular 
// Collection => plural
// Collections => authuser
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel