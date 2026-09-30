import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },

    firm: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },

    region: {
      type: String,
      enum: ["BC", "Alberta", "Other"],
      default: "BC",
    },

    plan: {
      type: String,
      enum: ["A", "B", "C", "Bundle"],
      default: "A",
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "converted",
        "closed",
      ],
      default: "new",
    },

    source: {
      type: String,
      default: "home-lead-capture",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);