import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema(
    {
        item:{
            type: String,
            require: true,
            trim: true,
        },
        pickupAddress:{
            type: Schema.Types.ObjectId,
            ref: "Address"
        },
        dropAddress:{
            type: Schema.Types.ObjectId,
            ref: "Address"
        },
        status:{
            type: String,
            enum: ["pending", "accepted", "walking", "completed", "cancelled"],
            default: "pending"
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        walker:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        payment:{
            type: Schema.Types.ObjectId,
            ref: "Payment"
        }
    },
    { 
        timestamps:true
    }
);


export const Order = mongoose.model("Order", orderSchema)