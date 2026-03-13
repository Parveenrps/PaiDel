import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    walker:{
        type: Schema.Types.ObjectId,
        ref: "Walker"
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
        enum: ["Pending", "Completed", "Failed"]
    },
},{ timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);