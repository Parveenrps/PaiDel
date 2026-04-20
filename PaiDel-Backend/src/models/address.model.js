import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    fullAddress: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    location: {
        lat: Number,
        lng: Number,
    }
}, { timestamps: true });

export const Address = mongoose.model("Address", addressSchema );