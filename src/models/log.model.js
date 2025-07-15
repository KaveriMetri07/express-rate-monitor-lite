import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    default: 1,
    required: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log", logSchema);
export default Log;
