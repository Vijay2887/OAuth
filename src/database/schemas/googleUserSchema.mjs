import mongoose, { Schema } from "mongoose";

const googleUserSchema = new Schema({
  displayName: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  googleID: {
    type: Schema.Types.String,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
  },
});

const GoogleUser = mongoose.model("googleUser", googleUserSchema);
export default GoogleUser;
