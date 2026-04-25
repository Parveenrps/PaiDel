import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema(
    {
        item:{
            type: String,
            require: true,
            trim: true,
        },
        pickupAddress:{
            type: String,
            require: true,
            trim: true,
        },
        dropAddress:{
            type: String,
            require: true,
            trim: true,
        },
        status:{
            type: String,
            enum: ["pending", "accepted", "walking", "completed", "cancelled"],
            default: "pending"
        },
        userID:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        walkerID:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        paymentID:{
            type: Schema.Types.ObjectId,
            ref: "Payment"
        }
    },
    { 
        timestamps:true
    }
);


export const Order = mongoose.model("Order", orderSchema)