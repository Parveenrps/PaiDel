import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema(
    {
        item:{
            type: String,
            require: true,
            trim: true,
        },
        pickFrom:{
            type: String,
            require: true,
            trim: true,
        },
        dropTo:{
            type: String,
            require: true,
            trim: true,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        walker:{
            type: Schema.Types.ObjectId,
            ref: "Walker"
        }
    },
    { 
        timestamps:true
    }
);


export const Order = mongoose.model("Order", orderSchema)