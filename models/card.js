import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CardShema = new Schema({
    gain: Number,
    accepted: Boolean,
    loan: Number,
    borrower: {
        gain: Number,
        acceptedReturn: Boolean,
    }
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', CardShema);

export default Card;
