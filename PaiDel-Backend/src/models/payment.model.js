import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema({
    orderID:{
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    walkerID:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    amount:{
        type: Number,
        required: true
    },
    method:{
        type: String,
        required: true,
        enum: ["Cash", "Card", "UPI"]
    },
    status:{
        type: String,
        required: true,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    },
},{ timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);