import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
    accEmail: { type: String, required: true, unique: true },
    accUserName: { type: String, required: true },
    accPassword: { type: String, required: true },
    accType: { type: String, required: true },
    currency: { type: String, required: true },
});

const BuyerModel = mongoose.model('Buyer', BuyerSchema);

export { BuyerModel };
