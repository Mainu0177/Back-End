import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }]
});
export default mongoose.moled("user", userSchema)