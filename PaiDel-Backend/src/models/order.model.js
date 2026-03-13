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
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        walker:{
            type: Schema.Types.ObjectId,
            ref: "Walker"
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